import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Login = () => {
  return (
    <form >
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button>Login</Button>

    </form>
  )
}

export default Login
