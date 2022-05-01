import MuiAlert from '@mui/material/Alert'
import PropTypes from 'prop-types'
import React from 'react'
import { Snackbar } from '@mui/material'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function SnackBar(props) {
  return (
    <Snackbar open={props.openSnackBar} autoHideDuration={6000} onClose={props.handleCloseSnackbar}>
      <Alert onClose={props.handleCloseSnackbar} severity={props.severity} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}

SnackBar.propTypes = {
  openSnackBar: PropTypes.bool.isRequired,
  handleCloseSnackbar: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired
}

export default SnackBar
