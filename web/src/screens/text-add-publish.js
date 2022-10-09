/* eslint-disable putout/nonblock-statement-body-newline */
import { Button, Chip, Stack } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import MenuSelect from '../components/menu-select.js'
import SnackBar from '../components/snack-bar.js'
import * as api from '../services/api-service.js'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'

const selector = (state) => state.text

function TextAddPublish() {
  const { text } = useSelector(selector)
  const { id } = useParams()

  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [postMessage, setPostMessage] = React.useState('')
  const [postState, setPostState] = React.useState('')

  const setStatus = (event) => dispatch({ type: 'SET_STATUS', status: event.target.value })
  const resetText = () => dispatch({ type: 'RESET_TEXT' })
  const setPublishAt = (event) => dispatch({ type: 'SET_PUBLISH_AT', publishAt: event.target.value })

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

  const addText = () => {
    api
      .addText(text)
      .then((res) => {
        if (res.success) {
          setOpenSnackbar(true)
          setPostMessage(res.message)
          setPostState('success')
          setTimeout(() => {
            resetText()
            navigate('/texts')
          }, 1500)

          return
        }

        setPostMessage(res.message)
        setPostState('error')
        setOpenSnackbar(true)
      })
      .catch((error) => console.log(error))
  }

  const updateText = () => {
    api
      .updateText(text, id)
      .then((res) => {
        if (res.success) {
          setOpenSnackbar(true)
          setPostState('success')
          setPostMessage(res.message)

          return
        }

        setPostState('error')
        setPostMessage(res.message)
        setOpenSnackbar(true)
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
          {text.sentences.length > 4 ? <Chip label="Words" color="success" /> : <Chip label="Words" color="error" />}
        </Stack>
      </Stack>
      <Stack spacing={0} style={{ paddingBottom: '50px', width: '700px' }}>
        <h4>Status</h4>
        <MenuSelect Heading="Status" Values={statuses} value={text.status} onChangeFunc={setStatus} />

        <h4>Publication Date</h4>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="YYYY-MM-DD"
            value={text.publishAt}
            onChange={setPublishAt}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Stack>
      {id ? (
        <Button variant="contained" onClick={updateText}>
          Update Status
        </Button>
      ) : (
        <Button variant="contained" onClick={addText}>
          Add Text
        </Button>
      )}
      <SnackBar
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity={postState}
        message={postMessage}
      />
    </Fragment>
  )
}

export default TextAddPublish
