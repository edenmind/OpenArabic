import { Button, Container } from '@mui/material'
import AuthorsList from './authors-list.js'
import ConfirmationDialog from '../components/confirmation-dialog.js'
import Footer from '../components/footer.js'
import * as api from '../services/api-service.js'
import { Link } from 'react-router-dom'
import Nav from '../components/nav.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'

const Authors = () => {
  const [authors, setAuthors] = React.useState([''])
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
    api
      .getAuthors()
      .then((res) => setAuthors(res))
      .catch((error) => console.log(error))
  }, [])

  const deleteAuthor = () => {
    api
      .deleteAuthor(selectedAuthor.id)
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
