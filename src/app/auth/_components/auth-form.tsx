'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { login } from "../actions/auth"
import { useToast } from "@/hooks/use-toast"

export function AuthForm() {
  const form = useForm()
  const { toast } = useToast()

  const handleSubmit = form.handleSubmit(async(data) => {
    let res = await login({ email: data.email, password: data.password})
    console.log('res', res)
    if(res?.error){
      toast({
        title: '⚠️ Erro',
        description: res?.error,
      })
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit}>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Digite seu e-mail e senha para acessar sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="name@example.com" required { ... form.register('email') }/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required { ... form.register('password') }/>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Acessar</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}