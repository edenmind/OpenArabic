import * as React from 'react'

import { Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import MenuSelect from '../components/MenuSelect'
import PropTypes from 'prop-types'

const TextAddHeading = (props) => {
  const dispatch = useDispatch()

  const setTitle = (event) => dispatch({ type: 'SET_TITLE', title: event.target.value })
  const setCategory = (event) => dispatch({ type: 'SET_CATEGORY', category: event.target.value })
  const setAuthor = (event) => dispatch({ type: 'SET_AUTHOR', author: event.target.value })
  const setSource = (event) => dispatch({ type: 'SET_SOURCE', source: event.target.value })

  const { text } = useSelector((state) => state.text)

  return (
    <Stack spacing={2}>
      <TextField fullWidth id='outlined-basic' label='Title' variant='outlined' value={text.title} onChange={setTitle} />
      <TextField fullWidth id='outlined-basic' label='Source' variant='outlined' value={text.source} onChange={setSource} />
      <MenuSelect Heading='Author' Values={props.Authors} value={text.author} onChangeFunc={setAuthor} />
      <MenuSelect Heading='Category' Values={props.Categories} value={text.category} onChangeFunc={setCategory} />
    </Stack>
  )
}

TextAddHeading.propTypes = {
  Authors: PropTypes.array.isRequired,
  Categories: PropTypes.array.isRequired,
}

export default TextAddHeading
