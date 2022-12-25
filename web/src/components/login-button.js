import { Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import LoginIcon from '@mui/icons-material/Login'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button onClick={() => loginWithRedirect()}>
      <LoginIcon />
    </Button>
  )
}

export default LoginButton
