import * as React from 'react'

import { Stack, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import MenuSelect from '../../components/MenuSelect'

const Heading = (props) => {
  const dispatch = useDispatch()
  const setTitle = (event) => dispatch({ type: 'SET_TITLE', title: event.target.value })
  const setCategory = (event) => dispatch({ type: 'SET_CATEGORY', category: event.target.value })
  const setAuthor = (event) => dispatch({ type: 'SET_AUTHOR', author: event.target.value })

  const { title } = useSelector((state) => state.title)
  const { category } = useSelector((state) => state.category)
  const { author } = useSelector((state) => state.author)

  return (
    <Stack spacing={2}>
      <TextField fullWidth id='outlined-basic' label='Title' variant='outlined' value={title} onChange={setTitle} />
      <MenuSelect Heading='Author' Values={props.Authors} value={author} onChangeFunc={setAuthor} />
      <MenuSelect Heading='Category' Values={props.Categories} value={category} onChangeFunc={setCategory} />
    </Stack>
  )
}

export default Heading
