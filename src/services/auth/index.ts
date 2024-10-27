import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/services/database"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { saltAndHashPassword } from "@/utils/helper";
 
export const {
  handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        const email = credentials.email as string;
        // const hash = saltAndHashPassword(credentials.password);

        let user: any = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        // if (!user) {
          // user = await prisma.user.create({
          //   data: {
          //     email,
          //     hashedPassword: hash,
          //   },
          // });
        // } else {
          const isMatch = bcrypt.compareSync(
            credentials.password as string,
            user.hashedPassword
          );
          if (!isMatch) {
            throw new Error("Incorrect password.");
          }
        // }

        return user;
      },
    }),
  ],
})