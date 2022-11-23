import { Box } from '@mui/system'
import Button from '@mui/material/Button'
import { Fragment } from 'react'
import * as React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

function TextListIdSentences(properties) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return properties.sentences.map((sentence, index) => (
    <Fragment key={index}>
      <Box sx={{ fontSize: 'h4.fontSize', m: 2, paddingTop: '25px' }}>{sentence.arabic}</Box>
      <Box sx={{ m: 2 }}>{sentence.english}</Box>
      <Button variant="text" onClick={handleClickOpen}>
        Vocabulary
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{'Vocabulary'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {sentence.words.map((word, index) => (
              <Fragment key={index}>
                <Box sx={{ fontSize: 'h4.fontSize', m: 2 }}>{word.arabic}</Box>
                <Box sx={{ m: 2 }}>{word.english}</Box>
              </Fragment>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  ))
}

TextListIdSentences.propTypes = {
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      english: PropTypes.string.isRequired,
      arabic: PropTypes.string.isRequired
    })
  ).isRequired
}

export default TextListIdSentences
