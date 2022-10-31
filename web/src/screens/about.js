import { Box, Button, Container, Link, List, ListItem, Stack, Typography } from '@mui/material'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React from 'react'
import * as api from '../services/api-service.js'

const About = () => {
  const [authors, setAuthors] = React.useState([])
  React.useEffect(() => {
    document.title = 'About'
    api
      .getAuthors()
      .then((res) => setAuthors(res))
      .catch((error) => console.log(error))
  }, [])

  // eslint-disable-next-line no-extra-parens
  const authorsList = authors.map((author, index) => (
    <ListItem key={index}>
      <Typography variant="span">{author.name}</Typography>
    </ListItem>
  ))

  const title = 'h6.fontSize'
  const subTitle = 'h5.fontSize'

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <Typography component="div">
          <Box sx={{ fontSize: title, m: 2 }}>بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</Box>

          <Box sx={{ fontSize: subTitle, m: 2 }}>Audience</Box>

          <Box sx={{ m: 2 }}>
            If you know some Arabic and strive to switch from reading Islamic texts in English to read in Arabic; then
            OpenArabic is a reading platform — featuring short bilingual texts and vocabulary quizzes — that will help
            you in that process, inshāʾAllāh
          </Box>

          <Box sx={{ m: 2 }}>
            OpenArabic does not teach the Arabic alphabet nor Arabic grammar. If you need a resource to get you started,
            then the Duolingo app available on{' '}
            <Link href="https://apps.apple.com/us/app/duolingo-language-lessons/id570060128">iPhone</Link> and
            <Link href="https://play.google.com/store/apps/details?id=com.duolingo&hl=en_US&gl=US"> Android </Link>
            might come in handy.
          </Box>

          <Box sx={{ fontSize: subTitle, m: 2 }}>Technological Platform</Box>
          <Box sx={{ m: 2 }}>
            The platform that OpenArabic runs upon is built using Open Source tools such as React Native, Fastify,
            MongoDB and Kubernetes.
          </Box>

          <Box sx={{ fontSize: subTitle, m: 2 }}>Foundation</Box>
          <Box sx={{ m: 2 }}>
            The theological foundation of OpenArabic is based upon the Qurʼān, the Prophetic Sunnah and the first
            generations of Muslims understanding with texts from Islamic Scholars such as:
          </Box>

          <List>{authorsList}</List>

          <Box sx={{ fontSize: subTitle, m: 2 }}>Founder</Box>
          <Box sx={{ m: 2 }}>
            OpenArabic.io was founded by Yūnus Andréasson in 1442 AH or 2020 AD. Yūnus is a convert to Islam since ~20
            years ago residing in Sweden working as a Software Developer. If you want to reach out, then please send an
            email to <Link href="mailto:yunus@edenmind.com">yunus@edenmind.com</Link> or make contact on{' '}
            <Link href="https://twitter.com/YunusAndreasson">Twitter</Link>.
          </Box>

          <Box sx={{ fontSize: subTitle, m: 2 }}>Contact</Box>
          <Box sx={{ m: 2 }}>
            If you find any bugs 🐛 or have any feature suggestions 💭 on how to improve OpenArabic, then please use any
            of the following channels:.
          </Box>

          <Box sx={{ m: 2 }}>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" href="https://github.com/edenmind/OpenArabic">
                GitHub
              </Button>

              <Button variant="outlined" href="mail:salam@edenmind.com">
                Mail
              </Button>

              <Button variant="outlined" href="https://www.instagram.com/openarabic.io/">
                Instagram
              </Button>

              <Button variant="outlined" href="https://twitter.com/OpenArabicIo">
                Twitter
              </Button>

              <Button variant="outlined" href="https://www.facebook.com/OpenArabic.io/">
                Facebook
              </Button>
            </Stack>
          </Box>
        </Typography>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default About
