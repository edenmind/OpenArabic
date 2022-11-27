import { Button, Container, Divider, Grid, Stack, Link, Tooltip, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CircularProgress from '@mui/material/CircularProgress'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React from 'react'
import TextListIdSentences from './text-list-id-sentences.js'
import { useParams } from 'react-router-dom'
import * as api from '../services/api-service.js'
import { timeAgo } from '../services/dates.js'
import * as links from '../services/link-generator.js'
import { useAuth0 } from '@auth0/auth0-react'

function TextListId() {
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const { isAuthenticated } = useAuth0()

  React.useEffect(() => {
    api
      .getText(id)
      .then((res) => {
        setText(res)
        setIsLoading(false)

        // set document title
        const titleAndAuthor = `${res.title} by ${res.author}`

        document.title = titleAndAuthor

        // todo: https://cards-dev.twitter.com/validator
      })
      .catch((error) => console.log(error))
  }, [id])

  return isLoading ? (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <center>
          <h1>{text.title}</h1>
          <h2>{text.author}</h2>
          <h4>{text.source}</h4>
          <img src={text.image} style={{ width: '100%', height: '100%' }} />
          <h4>{`${text.views} views · ${timeAgo(text.publishedAt)}`}</h4>
          <Divider width="300" />
          <TextListIdSentences sentences={text.sentences} />

          <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: 'center', paddingTop: '100px' }}>
            <Button variant="contained" href={links.generateLinkToPostOnTwitter(text.id)}>
              Post on Twitter
            </Button>
            <Button variant="contained" href={links.generateLinkToPostOnFacebook(text.id)}>
              Post on Facebook
            </Button>

            {isAuthenticated && (
              <Button variant="contained" href={`/texts/update/${text.id}`}>
                Edit
              </Button>
            )}
          </Stack>
        </center>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default TextListId
