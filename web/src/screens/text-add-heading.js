/* eslint-disable react/react-in-jsx-scope */
import * as React from 'react'

import { Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import MenuSelect from '../components/menu-select'
import axios from 'axios'

const selector = (state) => state.text

const TextAddHeading = () => {
  const dispatch = useDispatch()

  const setTitle = (event) => dispatch({ type: 'SET_TITLE', title: event.target.value })
  const setCategory = (event) => dispatch({ type: 'SET_CATEGORY', category: event.target.value })
  const setAuthor = (event) => dispatch({ type: 'SET_AUTHOR', author: event.target.value })
  const setSource = (event) => dispatch({ type: 'SET_SOURCE', source: event.target.value })
  const setStatus = (event) => dispatch({ type: 'SET_STATUS', status: event.target.value })

  const [categories, setCategories] = React.useState([])
  const [authors, setAuthors] = React.useState([])
  const [statuses] = React.useState([
    { id: 1, name: 'Draft' },
    { id: 2, name: 'Published' }
  ])

  const text = useSelector(selector)

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => console.log(error))
    axios
      .get(`${process.env.REACT_APP_API_URL}/authors`)
      .then((response) => {
        setAuthors(response.data)
      })
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
      <MenuSelect Heading="Status" Values={statuses} value={text.status} onChangeFunc={setStatus} />
      <MenuSelect Heading="Author" Values={authors} value={text.author} onChangeFunc={setAuthor} />
      <MenuSelect Heading="Category" Values={categories} value={text.category} onChangeFunc={setCategory} />
    </Stack>
  )
}

export default TextAddHeading
