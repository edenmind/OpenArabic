import { Button, Container, FormControl, Stack, TextField, Box } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import * as api from '../services/api-service.js'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React, { Suspense } from 'react'
import SnackBar from '../components/snack-bar.js'
import * as prompts from '../services/prompts.js'
import BasicModal from '../components/basic-modal.js'

const WordsUpdate = () => {
  const [english, setEnglish] = React.useState('')
  const [arabic, setArabic] = React.useState('')
  const [englishSentence, setEnglishSentence] = React.useState('')
  const [arabicSentence, setArabicSentence] = React.useState('')
  const [grammar, setGrammar] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState('')
  const [promptTitle, setPromptTitle] = React.useState('')
  const [promptText, setPromptText] = React.useState('')
  const [postState, setPostState] = React.useState('')
  const [openPrompt, setOpenPrompt] = React.useState(false)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const handleOpen = (promptTitle, promptText) => {
    setOpenPrompt(true)
    setPromptText(promptText)
    setPromptTitle(promptTitle)
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const divStyle = {
    padding: '10px'
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenPrompt(false)
  }

  const { textId, sentenceId, wordId } = useParams()

  React.useEffect(() => {
    api
      .getWordById(textId, sentenceId, wordId)
      .then((res) => {
        const { english, arabic, englishSentence, arabicSentence, grammar } = res
        setEnglish(english)
        setArabic(arabic)
        setEnglishSentence(englishSentence)
        setArabicSentence(arabicSentence)
        setGrammar(grammar)
      })
      .catch((error) => console.log(error))
  }, [sentenceId, textId, wordId])

  const updateWord = () => {
    const word = {
      english,
      arabic,
      arabicSentence,
      englishSentence,
      grammar,
      textId,
      sentenceId,
      wordId
    }
    api
      .updateWord(word)
      .then((res) => {
        if (res) {
          setStatus('Updated Word!')
          setOpen(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <h2>Update Word</h2>

        <div style={divStyle}>
          <h3>Text ID: {textId}</h3>
          <h3>Sentence ID: {sentenceId}</h3>
          <h3>Word ID: {wordId}</h3>
        </div>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '75ch' }
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <TextField
              fullWidth
              id="english"
              label="English"
              variant="outlined"
              value={english}
              onChange={(event) => setEnglish(event.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              id="arabic"
              label="Arabic"
              variant="outlined"
              value={arabic}
              onChange={(event) => setArabic(event.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              id="arabic-sentence"
              label="Arabic Sentence"
              variant="outlined"
              value={arabicSentence}
              onChange={(event) => setArabicSentence(event.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              id="english-sentence"
              label="English Sentence"
              variant="outlined"
              value={englishSentence}
              onChange={(event) => setEnglishSentence(event.target.value)}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              fullWidth
              id="grammar"
              label="Grammar"
              variant="outlined"
              multiline
              rows={7}
              value={grammar}
              onChange={(event) => setGrammar(event.target.value)}
            />
          </FormControl>
        </Box>

        <div style={divStyle}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={updateWord}>
              Update
            </Button>
            <Button
              onClick={() =>
                // eslint-disable-next-line implicit-arrow-linebreak
                handleOpen(
                  'Explain Translation',
                  prompts.getExplanationOfWord(english, arabic, arabicSentence, englishSentence)
                )
              }
              variant="outlined"
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Explain Grammar
            </Button>
            <Link to="/words">
              <Button variant="outlined">Back</Button>
            </Link>
          </Stack>
        </div>
        <Footer />
      </Container>

      <Suspense fallback={<div>Loading...</div>}>
        <BasicModal
          key={`${promptTitle}${promptText}`}
          open={openPrompt}
          handleClose={handleClose}
          title={promptTitle}
          text={promptText}
        />
        <SnackBar
          openSnackBar={openSnackBar}
          handleCloseSnackbar={handleCloseSnackbar}
          severity={postState}
          message={postMessage}
        />
      </Suspense>

      <SnackBar openSnackBar={open} handleCloseSnackbar={handleClose} severity="success" message={status} />
    </React.Fragment>
  )
}

export default WordsUpdate
