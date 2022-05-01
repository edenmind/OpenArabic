/* eslint-disable react/react-in-jsx-scope */
import { Button, Container } from '@mui/material'

import AuthorsList from './authors-list'
import ConfirmationDialog from '../components/confirmation-dialog'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import Nav from '../components/nav'
import React from 'react'
import SnackBar from '../components/snack-bar'
import axios from 'axios'

const Authors = () => {
  const [authors, setAuthors] = React.useState([])
  const [openDialog, setOpenDialog] = React.useState(false)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [selectedAuthor, setSelectedAuthor] = React.useState()

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
      .catch((error) => console.log(error))
  }, [])

  const deleteAuthor = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/authors/${selectedAuthor.id}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))

    const authorsAfterDelete = authors.filter((item) => item.id !== selectedAuthor.id)
    setAuthors(authorsAfterDelete)
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
        <h2>Authors</h2>

        <AuthorsList authors={authors} handleClickOpen={handleClickOpen} />
        <ConfirmationDialog
          confirmationQuestion="Are you sure you want to delete this author?"
          handleAction={deleteAuthor}
          handleCloseDialog={handleCloseDialog}
          openState={openDialog}
        />
        <SnackBar
          openSnackBar={openSnackBar}
          handleCloseSnackbar={handleCloseSnackbar}
          severity="success"
          message="Author deleted!"
        />
        <br />

        <Link to="/authors/add">
          <Button variant="contained">Add</Button>
        </Link>
        <Footer />
      </Container>
    </React.Fragment>
  )
}

export default Authors
