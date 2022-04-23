import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

import PropTypes from 'prop-types'

function ConfirmationDialog(props) {
  return (
    <Dialog open={props.openState} onClose={props.handleCloseDialog} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>{'Confirm'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{props.confirmationQuestion}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseDialog}>Cancel</Button>
        <Button onClick={props.handleAction} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  handleAction: PropTypes.func.isRequired,
  openState: PropTypes.bool.isRequired,
  confirmationQuestion: PropTypes.string.isRequired,
}

export default ConfirmationDialog
