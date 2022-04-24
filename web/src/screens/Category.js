import { Button, Container } from '@mui/material'

import CategoryList from './CategoryList'
import ConfirmationDialog from '../components/ConfirmationDialog'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import React from 'react'
import SnackBar from '../components/SnackBar'
import axios from 'axios'

function Category() {
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
      .delete(`${process.env.REACT_APP_API_URL}/categories/${selectedCategory.id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((err) => console.log(err))

    const newCategories = categories.filter((item) => item.id !== selectedCategory.id)
    setCategories(newCategories)
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
      <Container maxWidth='lg'>
        <h2>Categories</h2>

        <CategoryList category={categories} handleClickOpen={handleClickOpen} />
        <ConfirmationDialog openState={openDialog} handleCloseDialog={handleCloseDialog} handleAction={deleteCategory} confirmationQuestion='Are you sure you want to delete this category?' />
        <SnackBar handleCloseSnackbar={handleCloseSnackbar} openSnackBar={openSnackBar} severity='success' message='Category deleted!' />
        <br />
        <Link to='/categories/add'>
          <Button variant='contained'>Add</Button>
        </Link>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default Category
