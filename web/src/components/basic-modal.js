import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  transform: 'translate(-50%, -50%)', // Add this line,
  maxHeight: '80%', // Add this line to limit the height of the modal
  overflowY: 'auto'
}

export default function BasicModal(props) {
  function handleCopy() {
    navigator.clipboard.writeText(props.text)
  }
  return (
    <div>
      <Modal open={props.open} onClose={props.handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Button variant="outlined" onClick={handleCopy} sx={{ mt: 2 }}>
            Copy to Clipboard
          </Button>
          <Typography id="modal-modal-description" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
            {props.text}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

BasicModal.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}
