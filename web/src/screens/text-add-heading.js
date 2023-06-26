import * as React from 'react'
import { Stack, TextField, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MenuSelect from '../components/menu-select.js'
import StandardImageList from '../components/standard-image-list.js'
import * as api from '../services/api-service.js'
import { capitalizeTitle } from '../services/word-processing.js'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import BasicModal from '../components/basic-modal.js'
import { Suspense } from 'react'
import * as prompts from '../services/prompts.js'

const selector = (state) => state.text

const TextAddHeading = () => {
  const dispatch = useDispatch()

  const setTitle = (event) => {
    const capitalizedTitle = capitalizeTitle(event.target.value)
    dispatch({ type: 'SET_TITLE', title: capitalizedTitle })
  }
  const setCategory = (event) => dispatch({ type: 'SET_CATEGORY', category: event.target.value })
  const setAuthor = (event) => dispatch({ type: 'SET_AUTHOR', author: event.target.value })
  const setSource = (event) => dispatch({ type: 'SET_SOURCE', source: event.target.value })
  const setIntroduction = (event) => dispatch({ type: 'SET_INTRODUCTION', introduction: event.target.value })
  const [promptTitle, setPromptTitle] = React.useState('')
  const [promptText, setPromptText] = React.useState('')
  const [openPrompt, setOpenPrompt] = React.useState(false)

  const [categories, setCategories] = React.useState([])
  const [authors, setAuthors] = React.useState([])
  const [images, setImages] = React.useState([])

  const handleOpen = (promptTitle, promptText) => {
    setOpenPrompt(true)
    setPromptText(promptText)
    setPromptTitle(promptTitle)
  }

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenPrompt(false)
  }

  const { text } = useSelector(selector)

  React.useEffect(() => {
    api
      .getCategories()
      .then((res) => setCategories(res))
      .catch((error) => console.log(error))
    api
      .getAuthors()
      .then((res) => setAuthors(res))
      .catch((error) => console.log(error))
    api
      .getImages()
      .then((res) => setImages(res))
      .catch((error) => console.log(error))
  }, [])

  return (
    <Stack spacing={2} style={{ width: '700px' }}>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={text.title}
        onChange={setTitle}
      />

      <TextField
        fullWidth
        id="outlined-multiline-static"
        label="Introduction"
        multiline
        rows={4}
        variant="outlined"
        value={text.introduction}
        onChange={setIntroduction}
      />
      <Button
        onClick={() =>
          // eslint-disable-next-line implicit-arrow-linebreak
          handleOpen('Explain Particle', prompts.generateTitleAndSummary(text))
        }
        variant="outlined"
        color="primary"
        style={{ marginLeft: '10px' }}
      >
        Get Title & Summary
      </Button>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Source"
        variant="outlined"
        value={text.source}
        onChange={setSource}
      />
      <MenuSelect Heading="Author" Values={authors} value={text.author} onChangeFunc={setAuthor} />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <MenuSelect Heading="Category" Values={categories} value={text.category} onChangeFunc={setCategory} />
        <FormHelperText>The category affects the generation of vocabularies. </FormHelperText>
      </FormControl>
      <img src={text.image} alt={text.title} width={700} />
      <StandardImageList images={images} />

      <Suspense fallback={<div>Loading...</div>}>
        <BasicModal
          key={`${promptTitle}${promptText}`}
          open={openPrompt}
          handleClose={handleClose}
          title={promptTitle}
          text={promptText}
        />
      </Suspense>
    </Stack>
  )
}

export default TextAddHeading
