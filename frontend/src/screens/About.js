import { Container } from '@mui/material'
import Nav from './Nav'
import React from 'react'

const About = () => {
  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <div>
          <h2>Audience</h2>
          If you know some Arabic and strive to switch from reading Islamic texts in English to read in Arabic; then OpenArabic is a reading platform — featuring short bilingual texts and vocabulary
          quizzes — that will help you in that process, inshāʾAllāh. OpenArabic does not teach the Arabic alphabet nor Arabic grammar. If you need a resource to get you started, then the Duolingo app
          available on iPhone and Android might come in handy.
        </div>
      </Container>
    </React.Fragment>
  )
}

export default About
