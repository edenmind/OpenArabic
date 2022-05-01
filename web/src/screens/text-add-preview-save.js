/* eslint-disable react/react-in-jsx-scope */
import { Button, Chip, Stack } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SnackBar from '../components/snack-bar'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const selector = (state) => state.text

function TextAddPreviewSave() {
  const text = useSelector(selector)

  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const { id } = useParams()
  const [status, setStatus] = React.useState('')
  const dispatch = useDispatch()

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  const handleAdd = () => {
    const { title, author, category, sentences, source, texts } = text
    const { arabic, english } = texts
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/texts`,
      data: {
        title,
        category,
        status: 'Published',
        texts: {
          arabic,
          english
        },
        author,
        source,
        sentences
      }
    })
      .then((response) => {
        if (response.status === 201) {
          setOpenSnackbar(true)
          setStatus(`Added: ${title}!`)
          dispatch({ type: 'RESET_TEXT' })
        } else {
          setStatus(`Error: ${response.data.message}`)
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))
  }

  const handleUpdate = () => {
    const { title, author, category, sentences, source, texts } = text
    const { arabic, english } = texts
    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/texts/${id}`,
      data: {
        title,
        category,
        texts: {
          arabic,
          english
        },
        author,
        source,
        sentences
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
          setStatus(`Updated text: ${response.data.message}`)
          dispatch({ type: 'RESET_TEXT' })
        } else {
          setStatus(`Error: ${response.data.message}`)
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Fragment>
      <Stack direction="row" spacing={2} style={{ paddingTop: '50px' }}>
        {text.title.length > 4 ? <Chip label="Title" color="success" /> : <Chip label="Title" color="error" />}
        {text.category.length > 4 ? <Chip label="Category" color="success" /> : <Chip label="Category" color="error" />}
        {text.source.length > 4 ? <Chip label="Source" color="success" /> : <Chip label="Source" color="error" />}
        {text.author.length > 4 ? <Chip label="Author" color="success" /> : <Chip label="Author" color="error" />}
        {text.sentences.length > 4 ? (
          <Chip label="Sentences" color="success" />
        ) : (
          <Chip label="Sentences" color="error" />
        )}

        {id ? <Button onClick={handleUpdate}>Update Text</Button> : <Button onClick={handleAdd}>Add Text</Button>}
        <SnackBar
          openSnackBar={openSnackBar}
          handleCloseSnackbar={handleCloseSnackbar}
          severity="success"
          message={status}
        />
      </Stack>
    </Fragment>
  )
}

export default TextAddPreviewSave
