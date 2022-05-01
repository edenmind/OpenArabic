/* eslint-disable react/react-in-jsx-scope */
import { Button, Container } from '@mui/material'

import CategoryList from './categories-list'
import ConfirmationDialog from '../components/confirmation-dialog'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import Nav from '../components/nav'
import React from 'react'
import SnackBar from '../components/snack-bar'
import axios from 'axios'

function Categories() {
  const [categories, setCategories] = React.useState([])
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState()

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
      .catch((error) => console.log(error))
  }, [])

  const deleteCategory = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/categories/${selectedCategory.id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))

    const categoriesAfterDelete = categories.filter((item) => item.id !== selectedCategory.id)
    setCategories(categoriesAfterDelete)
    handleCloseDialog()
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  return (
    <React.Fragment>
      <Nav />
      <Container maxWidth="lg">
        <h2>Categories</h2>

        <CategoryList category={categories} handleClickOpen={handleClickOpen} />
        <ConfirmationDialog
          openState={openDialog}
          handleCloseDialog={handleCloseDialog}
          handleAction={deleteCategory}
          confirmationQuestion="Are you sure you want to delete this category?"
        />
        <SnackBar
          handleCloseSnackbar={handleCloseSnackbar}
          openSnackBar={openSnackBar}
          severity="success"
          message="Category deleted!"
        />
        <br />
        <Link to="/categories/add">
          <Button variant="contained">Add</Button>
        </Link>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default Categories
