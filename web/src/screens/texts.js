import * as apiService from '../services/api-service.js'

import { Button, Container, IconButton, Tooltip } from '@mui/material'

import ConfirmationDialog from '../components/confirmation-dialog.js'
import { DataGrid } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import Footer from '../components/footer.js'
import { Link } from 'react-router-dom'
import Nav from '../components/nav.js'
import Progress from '../components/progress.js'
import React from 'react'
import SnackBar from '../components/snack-bar.js'
import axios from 'axios'

export default function Texts() {
  const [texts, setTexts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [selectedText, setSelectedText] = React.useState()

  // eslint-disable-next-line putout/objects-braces-inside-array
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 125,
      editable: false
    },
    {
      field: 'publishAt',
      headerName: 'Published',
      width: 250,
      editable: false
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 250,
      editable: false
    },
    {
      field: 'source',
      headerName: 'Source',
      width: 250,
      editable: false
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      editable: false
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 350,
      editable: false
    },
    {
      field: 'sentences',
      headerName: 'Sentences',
      sortable: false,
      width: 120,
      valueGetter: (parameters) => `${parameters.row.sentences.length}`
    },
    {
      field: 'charters',
      headerName: 'Characters',
      sortable: false,
      width: 120,
      valueGetter: (parameters) => `${parameters.row.texts.arabic.length}`
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (parameters) => [
        <Link to={`/texts/update/${parameters.row.id}`} key="link">
          <Tooltip title="Edit text">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>,
        <Tooltip title="Delete text" key="tooltip">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => handleClickOpen(parameters.row.id)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      ]
    }
  ]

  React.useEffect(() => {
    apiService
      .getTexts()
      .then((data) => {
        setTexts(data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleDeleteClick = () => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/texts/${selectedText}`,
      headers: {
        auth: `${process.env.REACT_APP_KEY}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
          setOpenDialog(false)
        }
      })
      .catch((error) => console.log(error))

    const textsAfterDelete = texts.filter((item) => item.id !== selectedText)
    setTexts(textsAfterDelete)
  }

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleClickOpen = (id) => {
    setSelectedText(id)
    setOpenDialog(true)
  }

  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth="false">
        <h2>Texts</h2>
        <div style={{ height: 800, width: '100%', paddingBottom: '35px' }}>
          <DataGrid rows={texts} columns={columns} pageSize={15} rowsPerPageOptions={[5]} />
        </div>

        <Link to="/texts/add">
          <Button variant="contained">Add Text</Button>
        </Link>
        <Footer />
      </Container>
      <ConfirmationDialog
        openState={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleAction={handleDeleteClick}
        confirmationQuestion="Are you sure you want to delete this text?"
      />

      <SnackBar
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message="Text deleted!"
      />
    </React.Fragment>
  )
}
