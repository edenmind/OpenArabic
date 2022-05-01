/* eslint-disable react/react-in-jsx-scope */

import { Button } from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  return <Button onClick={() => loginWithRedirect()}>Admin</Button>
}

export default LoginButton
