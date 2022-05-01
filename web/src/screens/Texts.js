import * as apiService from '../services/apiService'

import { Button, Container, IconButton, Tooltip } from '@mui/material'

import ConfirmationDialog from '../components/ConfirmationDialog'
import { DataGrid } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Progress from '../components/Progress'
import React from 'react'
import SnackBar from '../components/SnackBar'
import axios from 'axios'

export default function Texts() {
  const [texts, setTexts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [selectedText, setSelectedText] = React.useState(null)

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
      editable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false,
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 250,
      editable: false,
    },
    {
      field: 'source',
      headerName: 'Source',
      width: 250,
      editable: false,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 120,
      editable: false,
    },
    {
      field: 'sentences',
      headerName: 'Sentences',
      sortable: false,
      width: 120,
      valueGetter: (params) => `${params.row.sentences.length}`,
    },
    {
      field: 'charters',
      headerName: 'Characters',
      sortable: false,
      width: 120,
      valueGetter: (params) => `${params.row.texts.arabic.length}`,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <Link to={`/texts/update/${params.row.id}`}>
          <Tooltip title='Edit text'>
            <IconButton color='primary' aria-label='upload picture' component='span'>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>,
        <Tooltip title='Delete text'>
          <IconButton color='primary' aria-label='upload picture' component='span' onClick={() => handleClickOpen(params.row.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>,
      ],
    },
  ]

  React.useEffect(() => {
    apiService
      .getTexts()
      .then((data) => {
        setTexts(data)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [])

  const handleDeleteClick = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/texts/${selectedText}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
          setOpenDialog(false)
        }
      })
      .catch((err) => console.log(err))

    const newTexts = texts.filter((item) => item.id !== selectedText)
    setTexts(newTexts)
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
      <Container maxWidth='false'>
        <h2>Texts</h2>
        <div style={{ height: 800, width: '100%', paddingBottom: '35px' }}>
          <DataGrid rows={texts} columns={columns} pageSize={15} rowsPerPageOptions={[5]} />
        </div>

        <Link to='/texts/add'>
          <Button variant='contained'>Add Text</Button>
        </Link>
        <Footer />
      </Container>
      <ConfirmationDialog openState={openDialog} handleCloseDialog={handleCloseDialog} handleAction={handleDeleteClick} confirmationQuestion='Are you sure you want to delete this text?' />

      <SnackBar openSnackBar={openSnackBar} handleCloseSnackbar={handleCloseSnackbar} severity='success' message='Text deleted!' />
    </React.Fragment>
  )
}
