import { Button } from '@mui/material'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LogoutButton = () => {
  const { logout } = useAuth0()

  return <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
}

export default LogoutButton
