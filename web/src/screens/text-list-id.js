import { Container, Divider, Grid } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React from 'react'
import TextListIdSentences from './text-list-id-sentences.js'
import { useParams } from 'react-router-dom'
import * as api from '../services/api-service.js'
<<<<<<< HEAD
import { getTimeAgoFromString } from '../services/dates.js'
=======
import { truncate } from '../services/word-processing.js'
>>>>>>> 2cc65c776 (feat(web): :sparkles: add title to pages for enhanced sharing)

function TextListId() {
  const { id } = useParams()
  const [text, setText] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

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
          <h4>
            {text.category} · {`${text.views} views · ${getTimeAgoFromString(text.publishAt)}`}
          </h4>
          <Divider width="300" />
          <TextListIdSentences sentences={text.sentences} />
        </center>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default TextListId
