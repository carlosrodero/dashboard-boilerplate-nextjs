import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <h1 className="text-2xl">Landing page</h1>
        <div className="flex gap-3">
          <Link href="/app">
            <Button>Acessar</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
