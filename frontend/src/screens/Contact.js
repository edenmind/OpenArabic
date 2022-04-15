import { Box, Button, Container, Stack } from '@mui/material'

import Footer from '../components/Footer'
import Nav from '../components/Nav'
import React from 'react'

const Contact = () => {
  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <Box sx={{ fontSize: 'h5.fontSize', m: 2 }}>Contact</Box>
        <Box sx={{ m: 2 }}>If you find any bugs 🐛 or have any feature suggestions 💭 on how to improve OpenArabic, then please contact us.</Box>

        <Box sx={{ m: 2 }}>
          <Stack spacing={2} direction='row'>
            <Button variant='contained' href='https://github.com/edenmind/OpenArabic'>
              GitHub
            </Button>

            <Button variant='contained' href='mail:salam@edenmind.com'>
              Mail
            </Button>

            <Button variant='contained' href='https://www.instagram.com/openarabic.io/'>
              Instagram
            </Button>

            <Button variant='contained' href='https://twitter.com/OpenArabicIo'>
              Twitter
            </Button>

            <Button variant='contained' href='https://www.facebook.com/OpenArabic.io/'>
              Facebook
            </Button>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  )
}

export default Contact
