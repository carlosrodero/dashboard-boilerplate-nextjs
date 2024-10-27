'use server'

import { auth } from "@/services/auth";

export async function initialsName () {
  const session = await auth()
  if(session?.user?.name){  
    const parts = session?.user?.name.split(' ')
    if (parts.length < 2) {
        return ''
    }
    const firstInitial = parts[0].charAt(0).toUpperCase()
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase()
    return firstInitial + lastInitial
  }
  return ''
}