import { Box } from '@mui/system'
import React from 'react'

function Footer() {
  const stickyFooterStyle = {
    marginTop: '1rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '1rem',
    position: 'fixed',
    bottom: '0',
  }

  return (
    <div style={stickyFooterStyle}>
      <Box sx={{ typography: 'body2' }}>Copyright © 1443/2022 Edenmind. All rights reserved.</Box>
    </div>
  )
}

export default Footer
