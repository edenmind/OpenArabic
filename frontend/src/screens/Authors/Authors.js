import { Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, Snackbar, Typography } from '@mui/material'
import React, { Fragment } from 'react'

import MuiAlert from '@mui/material/Alert'
import Nav from '../Nav'
import axios from 'axios'

export const Authors = () => {
  const [authors, setAuthors] = React.useState([])
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [selectedAuthor, setSelectedAuthor] = React.useState(null)

  const handleClickOpen = (author) => {
    setSelectedAuthor(author)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/authors`)
      .then((response) => {
        setAuthors(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const deleteAuthor = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/authors/${selectedAuthor._id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((err) => console.log(err))

    const newAuthors = authors.filter((item) => item._id !== selectedAuthor._id)
    setAuthors(newAuthors)
    handleCloseDialog()
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const deleteAuthorDialog = (
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>{'Confirm'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>Are you sure you want to delete this author?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={deleteAuthor} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  const snackbar = (
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
        Author deleted!
      </Alert>
    </Snackbar>
  )

  const authorsList = authors.map((author, index) => (
    <Fragment key={index}>
      <Card sx={{ minWidth: 275 }} key={index}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Sunni Scholar
          </Typography>
          <Typography variant='h5' component='div'>
            {author.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Placeholder
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' href={`/authors/update/${author._id}`}>
            Edit
          </Button>
          <Button size='small' onClick={() => handleClickOpen(author)}>
            Delete
          </Button>
        </CardActions>
        <Divider />
      </Card>
    </Fragment>
  ))

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth='lg'>
        <h2>Authors</h2>

        {authorsList}
        {deleteAuthorDialog}
        {snackbar}
        <br />
        <Button variant='contained' href='/authors/add'>
          Add
        </Button>
      </Container>
    </React.Fragment>
  )
}
