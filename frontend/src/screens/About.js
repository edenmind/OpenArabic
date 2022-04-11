import { Box, Container, Link, List, ListItem, ListItemText, Typography } from '@mui/material'

import Nav from './Nav'
import React from 'react'
import axios from 'axios'

const About = () => {
  const [authors, setAuthors] = React.useState([])
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/authors`)
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const authorsList = authors.map((author, index) => (
    <ListItem key={index}>
      <Typography variant='span'>{author.name}</Typography>
    </ListItem>
  ))

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <Typography component='div'>
          <Box sx={{ fontSize: 'h6.fontSize', m: 2 }}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Box>

          <Box sx={{ fontSize: 'h5.fontSize', m: 2 }}>Audience</Box>

          <Box sx={{ m: 2 }}>
            If you know some Arabic and strive to switch from reading Islamic texts in English to read in Arabic; then OpenArabic is a reading platform — featuring short bilingual texts and vocabulary
            quizzes — that will help you in that process, inshāʾAllāh
          </Box>

          <Box sx={{ m: 2 }}>
            OpenArabic does not teach the Arabic alphabet nor Arabic grammar. If you need a resource to get you started, then the Duolingo app available on{' '}
            <Link href='https://apps.apple.com/us/app/duolingo-language-lessons/id570060128'>iPhone</Link> and
            <Link href='https://play.google.com/store/apps/details?id=com.duolingo&hl=en_US&gl=US'> Android </Link>
            might come in handy.
          </Box>
          <Box sx={{ fontSize: 'h5.fontSize', m: 2 }}>Foundation</Box>

          <Box sx={{ m: 2 }}>
            The theological foundation of OpenArabic is based upon the Qurʼān, the Prophetic Sunnah and the first generations of Muslims understanding with texts from Islamic Scholars such as:
          </Box>

          <List>{authorsList}</List>
        </Typography>
      </Container>
    </React.Fragment>
  )
}

export default About
