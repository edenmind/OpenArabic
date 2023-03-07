import * as React from 'react'
import { Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import MenuSelect from '../components/menu-select.js'
import StandardImageList from '../components/standard-image-list.js'
import * as api from '../services/api-service.js'
import { capitalizeTitle } from '../services/word-processing.js'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

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

  const [categories, setCategories] = React.useState([])
  const [authors, setAuthors] = React.useState([])
  const [images, setImages] = React.useState([])

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
        id="outlined-basic"
        label="Source"
        variant="outlined"
        value={text.source}
        onChange={setSource}
      />

      <MenuSelect Heading="Author" Values={authors} value={text.author} onChangeFunc={setAuthor} />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <MenuSelect Heading="Category" Values={categories} value={text.category} onChangeFunc={setCategory} />
        <FormHelperText>The category affects the generation of vocabularies. [PRAYER] and [40 HADITH]</FormHelperText>
      </FormControl>

      <img src={text.image} alt={text.title} width={700} />
      <StandardImageList images={images} />
    </Stack>
  )
}

export default TextAddHeading
