import { Button, Chip, Stack, Tooltip } from '@mui/material'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import MenuSelect from '../components/menu-select.js'
import SnackBar from '../components/snack-bar.js'
import * as api from '../services/api-service.js'
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

const selector = (state) => state.text

function TextAddPublish() {
  const { text } = useSelector(selector)
  const { id } = useParams()

  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [postMessage, setPostMessage] = React.useState('')
  const [postState, setPostState] = React.useState('')

  const setStatus = (event) => dispatch({ type: 'SET_STATUS', status: event.target.value })
  const resetText = () => dispatch({ type: 'RESET_TEXT' })
  const setPublishAt = (value) => dispatch({ type: 'SET_PUBLISH_AT', publishAt: value })
  const setGenerateAudio = (event) => dispatch({ type: 'SET_GENERATE_AUDIO', generateAudio: event.target.value })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [statuses] = React.useState([
    { id: 1, name: 'Draft' },
    { id: 2, name: 'Validated' },
    { id: 3, name: 'Published' }
  ])

  const [trueFalse] = React.useState([
    { id: 1, name: 'Yes' },
    { id: 2, name: 'No' }
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
    //adjust before posting

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
          {text.title.length > 3 ? (
            <Chip label="Title" color="success" />
          ) : (
            <Tooltip title="Must have at least four chars.">
              <Chip label="Title" color="error" />
            </Tooltip>
          )}
          {text.category.length > 3 ? (
            <Chip label="Category" color="success" />
          ) : (
            <Tooltip title="Must have at least four chars.">
              <Chip label="Category" color="error" />
            </Tooltip>
          )}
          {text.source.length > 3 ? (
            <Chip label="Source" color="success" />
          ) : (
            <Tooltip title="Must have at least four chars.">
              {' '}
              <Chip label="Source" color="error" />
            </Tooltip>
          )}
          {text.author.length > 3 ? (
            <Chip label="Author" color="success" />
          ) : (
            <Tooltip title="Must have at least four chars.">
              {' '}
              <Chip label="Author" color="error" />
            </Tooltip>
          )}
          {text.sentences.length > 2 ? (
            <Chip label="Words" color="success" />
          ) : (
            <Tooltip title="Must have at least three sentences.">
              <Chip label="Words" color="error" />
            </Tooltip>
          )}
        </Stack>
      </Stack>
      <Stack spacing={0} style={{ paddingBottom: '50px', width: '700px' }}>
        <h4>Status</h4>
        <MenuSelect Values={statuses} value={text.status} onChangeFunc={setStatus} />

        <h4>Publication Date</h4>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateTimePicker
            inputFormat="YYYY-MM-DD"
            value={dayjs(text.publishAt)}
            onChange={(newValue) => setPublishAt(newValue)}
          />
        </LocalizationProvider>
        {id && (
          <>
            <h4>Generate Audio</h4>
            <MenuSelect Values={trueFalse} value={text.generateAudio} onChangeFunc={setGenerateAudio} />
          </>
        )}
      </Stack>
      {id ? (
        <Button variant="contained" onClick={updateText}>
          Update Text
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
