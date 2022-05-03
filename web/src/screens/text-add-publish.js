import { Button, Chip, Stack } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import MenuSelect from '../components/menu-select.js'
import SnackBar from '../components/snack-bar.js'
import axios from 'axios'

const selector = (state) => state.text

function TextAddPublish() {
  const { text } = useSelector(selector)

  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const { id } = useParams()
  const [status, setStatus] = React.useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // eslint-disable-next-line putout/objects-braces-inside-array
  const [statuses] = React.useState([
    { id: 1, name: 'Draft' },
    { id: 2, name: 'Validated' },
    { id: 3, name: 'Published' }
  ])

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
        status,
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
          setTimeout(() => {
            dispatch({ type: 'RESET_TEXT' })
            navigate('/texts')
          }, 1000)
        } else {
          setStatus(`Error: ${response.data.message}`)
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))
  }

  const handleUpdate = () => {
    const { title, author, category, sentences, source, texts, status } = text
    const { arabic, english } = texts

    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/texts/${id}`,
      data: {
        title,
        category,
        status,
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
          setTimeout(() => {
            navigate('/texts')
          }, 1000)
        } else {
          setStatus(`Error: ${response.data.message}`)
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Fragment>
      <Stack spacing={0} style={{ paddingBottom: '50px', width: '700px' }}>
        <h4>Validation</h4>
        <Stack direction="row" spacing={2}>
          {text.title.length > 4 ? <Chip label="Title" color="success" /> : <Chip label="Title" color="error" />}
          {text.category.length > 4 ? (
            <Chip label="Category" color="success" />
          ) : (
            <Chip label="Category" color="error" />
          )}
          {text.source.length > 4 ? <Chip label="Source" color="success" /> : <Chip label="Source" color="error" />}
          {text.author.length > 4 ? <Chip label="Author" color="success" /> : <Chip label="Author" color="error" />}
          {text.sentences.length > 4 ? (
            <Chip label="Sentences" color="success" />
          ) : (
            <Chip label="Sentences" color="error" />
          )}
        </Stack>
      </Stack>
      <Stack spacing={0} style={{ paddingBottom: '30px', width: '700px' }}>
        <h4>Status</h4>
        <MenuSelect Heading="Status" Values={statuses} value={text.status} onChangeFunc={setStatus} />
      </Stack>
      {id ? (
        <Button variant="contained" onClick={handleUpdate}>
          Update Status
        </Button>
      ) : (
        <Button variant="contained" onClick={handleAdd}>
          Add Text
        </Button>
      )}
      <SnackBar
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message={status}
      />
    </Fragment>
  )
}

export default TextAddPublish
