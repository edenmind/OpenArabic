import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import { Fragment } from 'react'
import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Divider } from '@mui/material'

function TextListIdSentences(properties) {
  const [open, setOpen] = React.useState(false)
  const [sentencesToShow, setSentencesToShow] = React.useState([])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const sentences = properties.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Box sx={{ fontSize: 'h4.fontSize', m: 2, paddingTop: '25px', direction: 'rtl' }}>
        <h3 style={{ direction: 'rtl', fontSize: 33 }}>{sentence.arabic}</h3>
      </Box>
      <Box sx={{ m: 2 }}>{sentence.english}</Box>
      <Button
        variant="text"
        onClick={() => {
          handleClickOpen()
          setSentencesToShow(sentence.words)
        }}
      >
        Vocabulary
      </Button>
    </Fragment>
  ))

  const dialog = (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{'Vocabulary'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {sentencesToShow.map((word, index) => (
            <Fragment key={index}>
              <Box sx={{ fontSize: 'h3.fontSize', m: 2, minWidth: '300px', direction: 'rtl' }}>
                <h3 style={{ direction: 'rtl', fontSize: 33 }}>{word.arabic}</h3>
              </Box>
              <Box sx={{ m: 2 }}>{word.english.charAt(0).toUpperCase() + word.english.slice(1)}</Box>
              <Divider />
            </Fragment>
          ))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )

  return (
    <Fragment>
      {sentences}
      {dialog}
    </Fragment>
  )
}

export default TextListIdSentences
