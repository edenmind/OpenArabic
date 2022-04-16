import { Link, Stack } from '@mui/material'

import React from 'react'

function Footer() {
  const stickyFooterStyle = {
    marginTop: '15rem',
    marginBottom: '3rem',
    marginLeft: 'auto',
    marginRight: 'auto',
  }

  return (
    <div style={stickyFooterStyle}>
      <Stack spacing={2} direction='row'>
        <Link href='https://apps.apple.com/se/app/open-arabic/id1594031029?l=en'>
          <img src='/iphone.svg' alt='iPhone' />
        </Link>
        <Link href='https://play.google.com/store/apps/details?id=com.edenmind.OpenArabic'>
          <img src='/android.svg' alt='Android' />
        </Link>
      </Stack>
      <br />
      Copyright © 1443/2022 Edenmind. All rights reserved.
    </div>
  )
}

export default Footer
