/* link to check root word
add property for when the word was added
*/

/* eslint-disable operator-linebreak */
import { Button, Container, FormControl, Stack, TextField, Box } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import * as api from '../services/api-service.js'
import Footer from '../components/footer.js'
import Nav from '../components/nav.js'
import React, { Suspense } from 'react'
import SnackBar from '../components/snack-bar.js'
import * as prompts from '../services/prompts.js'
import BasicModal from '../components/basic-modal.js'

function addEmptyLineAfterSentences(str) {
  const sentences = str.split(/(?<!\n)(?<=[!.?]["']?(?=\s|$)) /) // split the string into sentences
  // eslint-disable-next-line unicorn/no-array-reduce
  const result = sentences.reduce((acc, sentence) => {
    acc += sentence.trim() + (/[!.?]["']?$/.test(sentence) ? '\n\n' : '') // add the current sentence to the result string and add a new empty line if it ends with a period, exclamation mark, or question mark followed by an optional quote mark
    return acc
  }, '')

  return result.trim() // remove trailing whitespace
}

const WordsUpdate = () => {
  const [english, setEnglish] = React.useState('')
  const [arabic, setArabic] = React.useState('')
  const [englishSentence, setEnglishSentence] = React.useState('')
  const [arabicSentence, setArabicSentence] = React.useState('')
  const [arabicText, setArabicText] = React.useState('')
  const [englishText, setEnglishText] = React.useState('')
  const [grammar, setGrammar] = React.useState('')
  const [filename, setFilename] = React.useState('')
  const [quiz, setQuiz] = React.useState('')
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
        const { english, arabic, englishSentence, arabicSentence, grammar, filename, quiz, englishText, arabicText } =
          res
        setEnglish(english)
        setArabic(arabic)
        setEnglishSentence(englishSentence)
        setArabicSentence(arabicSentence)
        setGrammar(grammar)
        setFilename(filename)
        setArabicText(arabicText)
        setEnglishText(englishText)
        setQuiz(quiz)
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
      wordId,
      filename,
      quiz
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
      <Container fullWidth>
        <h2>Update Word</h2>

        <div style={divStyle}>
          <h3>Text ID: {textId}</h3>
          <h3>Sentence ID: {sentenceId}</h3>
          <h3>Word ID: {wordId}</h3>
          <h3>Filename: {filename}</h3>
        </div>

        <div style={divStyle}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={updateWord}>
              Update
            </Button>
            <Button
              onClick={() =>
                // eslint-disable-next-line implicit-arrow-linebreak
                handleOpen(
                  'Explain Verb',
                  prompts.getExplanationOfVerb(
                    english,
                    arabic,
                    arabicSentence,
                    englishSentence,
                    arabicText,
                    englishText
                  )
                )
              }
              variant="outlined"
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Explain Verb
            </Button>
            <Button
              onClick={() =>
                // eslint-disable-next-line implicit-arrow-linebreak
                handleOpen(
                  'Explain Noun',
                  prompts.getExplanationOfNoun(
                    english,
                    arabic,
                    arabicSentence,
                    englishSentence,
                    arabicText,
                    englishText
                  )
                )
              }
              variant="outlined"
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Explain Noun
            </Button>
            <Button
              onClick={() =>
                // eslint-disable-next-line implicit-arrow-linebreak
                handleOpen(
                  'Explain Particle',
                  prompts.getExplanationOfParticle(
                    english,
                    arabic,
                    arabicSentence,
                    englishSentence,
                    arabicText,
                    englishText
                  )
                )
              }
              variant="outlined"
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Explain Particle
            </Button>
            <Button
              onClick={() =>
                // eslint-disable-next-line implicit-arrow-linebreak
                handleOpen(
                  'Verify Grammar',
                  prompts.verifyGrammar(english, arabic, arabicSentence, englishSentence, grammar)
                )
              }
              variant="outlined"
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Verify Grammar
            </Button>
            <Button
              onClick={() =>
                // eslint-disable-next-line implicit-arrow-linebreak
                handleOpen('Preview', <span style={{ whiteSpace: 'pre-wrap', fontSize: 33 }}>{grammar}</span>)
              }
              variant="outlined"
              color="primary"
              style={{ marginLeft: '10px' }}
            >
              Preview
            </Button>
            <Link to="/words">
              <Button variant="outlined">Back</Button>
            </Link>
          </Stack>
        </div>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' } // Set width of all text fields to 100%
          }}
          fullWidth
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
              InputProps={{
                style: {
                  fontSize: '40px'
                }
              }}
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
              InputProps={{
                style: {
                  fontSize: '40px'
                }
              }}
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
              rows={25}
              value={grammar}
              onChange={(event) => setGrammar(addEmptyLineAfterSentences(event.target.value))}
              InputProps={{
                style: {
                  fontSize: '25px'
                }
              }}
            />
          </FormControl>
        </Box>
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
