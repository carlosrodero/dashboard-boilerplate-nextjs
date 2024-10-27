'use server'

import { signIn, signOut } from '@/services/auth'
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/services/database"

export async function login(data: any) {
  const user: any = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if(!user) return { error: "E-mail ou senha inválidos. Tente novamente." }

  const rawFormData = {
    email: data.email,
    password: data.password,
    role: "ADMIN",
    redirectTo: "/app",
  }

  try {
    await signIn("credentials", rawFormData)
  } catch (error: any) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error && error.cause?.err.message === 'Incorrect password.') {
        return { error: "E-mail ou senha inválidos. Tente novamente." }
      }
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "E-mail ou senha inválidos. Tente novamente." }
        default:
          return { error: "Ops, ocorreu algum erro!" }
      }
    }

    throw error;
  }
  revalidatePath("/");
}

export async function logout() {
  console.log('logout')
  await signOut({ redirectTo: '/auth' })
  revalidatePath('/auth')
}