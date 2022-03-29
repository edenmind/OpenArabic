import { Container } from '@mui/material'
import Nav from './Nav'
import React from 'react'

const Contact = () => {
  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <div>
          <h2>Audience</h2>
          If you find any bugs 🐛 or have any feature suggestions 💭 on how to improve OpenArabic, then please use this contact form or raise 🚀 an issue on Github.
        </div>
      </Container>
    </React.Fragment>
  )
}

export default Contact
