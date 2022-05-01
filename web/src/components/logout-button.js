import { Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

function LogoutButton() {
  const { logout } = useAuth0()

  return <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
}

export default LogoutButton
