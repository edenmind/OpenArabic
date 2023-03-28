import { Container, IconButton, Tooltip } from '@mui/material'
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
import * as api from '../services/api-service.js'

export default function Words() {
  const [words, setWords] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [selectedWord, setSelectedWord] = React.useState()

  const columns = [
    {
      field: 'arabic',
      headerName: 'Arabic',
      width: 250,
      editable: false,
      valueGetter: (params) => {
        return params.value || ''
      },
      renderCell: (params) => {
        return (
          <div
            style={{
              fontSize: 35,
              direction: 'rtl'
            }}
          >
            {params.value || ''}
          </div>
        )
      }
    },
    {
      field: 'english',
      headerName: 'English',
      width: 250,
      editable: false,
      valueGetter: (params) => {
        return params.value || ''
      },
      renderCell: (params) => {
        return (
          <div
            style={{
              fontSize: 15
            }}
          >
            {params.value || ''}
          </div>
        )
      }
    },
    {
      field: 'source',
      headerName: 'Source',
      width: 100,
      editable: false
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 100,
      editable: false
    },
    {
      field: 'categoryLevel',
      headerName: 'Level',
      width: 100,
      editable: false
    },
    {
      field: 'arabicSentence',
      headerName: 'Arabic Sentence',
      width: 750,
      editable: false,
      valueGetter: (params) => {
        return params.value || ''
      },
      renderCell: (params) => {
        return (
          <div
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: 3.5,
              fontSize: 25 // set your desired font size
            }}
          >
            {params.value || ''}
          </div>
        )
      }
    },
    {
      field: 'englishSentence',
      headerName: 'English Sentence',
      width: 750,
      editable: false,
      cellClassName: 'word-wrap',
      valueGetter: (params) => {
        return params.value || ''
      },
      renderCell: (params) => {
        return (
          <div
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: 3.5,
              fontSize: 15 // set your desired font size
            }}
          >
            {params.value || ''}
          </div>
        )
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (parameters) => [
        <Link to={`/words/update/${parameters.row.id}`} key="link">
          <Tooltip title="Edit word">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>,
        <Tooltip title="Delete word" key="tooltip">
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
    api
      .getWords()
      .then((data) => {
        setWords(data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  const deleteWord = () => {
    api
      .deleteWord(selectedWord)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))

    const wordsAfterDelete = words.filter((item) => item.id !== selectedWord)
    setWords(wordsAfterDelete)
    handleCloseDialog()
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
    setSelectedWord(id)
    setOpenDialog(true)
  }

  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth="true">
        <h2>Words</h2>
        <div style={{ height: 800, width: '100%', paddingBottom: '35px', fontSize: '17px' }}>
          {words !== undefined && (
            <DataGrid
              rows={words}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[5]}
              style={{ fontSize: '25px' }}
            />
          )}
        </div>
        <Footer />
      </Container>
      <ConfirmationDialog
        openState={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleAction={deleteWord}
        confirmationQuestion="Are you sure you want to delete this word?"
      />

      <SnackBar
        openSnackBar={openSnackBar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message="Word deleted!"
      />
    </React.Fragment>
  )
}
