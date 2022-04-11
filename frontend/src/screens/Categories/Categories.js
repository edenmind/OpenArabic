import { Button, Card, CardActions, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, Snackbar, Typography } from '@mui/material'
import React, { Fragment } from 'react'

import MuiAlert from '@mui/material/Alert'
import Nav from '../../components/Nav'
import axios from 'axios'

export const Categories = () => {
  const [categories, setCategories] = React.useState([])
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState(null)

  const handleClickOpen = (category) => {
    setSelectedCategory(category)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const deleteCategory = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/categories/${selectedCategory._id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((err) => console.log(err))

    const newCategories = categories.filter((item) => item._id !== selectedCategory._id)
    setCategories(newCategories)
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

  const deleteCategoryDialog = (
    <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title'>{'Confirm'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>Are you sure you want to delete this category?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={deleteCategory} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  const snackbar = (
    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
        Category deleted!
      </Alert>
    </Snackbar>
  )

  const categoriesList = categories.map((category, index) => (
    <Fragment key={index}>
      <Card sx={{ minWidth: 275 }} key={index}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            Placeholder
          </Typography>
          <Typography variant='h5' component='div'>
            {category.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            Placeholder
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' href={`/categories/update/${category._id}`}>
            Edit
          </Button>
          <Button size='small' onClick={() => handleClickOpen(category)}>
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
        <h2>Categories</h2>

        {categoriesList}
        {deleteCategoryDialog}
        {snackbar}
        <br />
        <Button variant='contained' href='/categories/add'>
          Add
        </Button>
      </Container>
    </React.Fragment>
  )
}
