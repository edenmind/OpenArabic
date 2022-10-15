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
import * as api from '../services/api-service.js'

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
      field: 'category',
      headerName: 'Category',
      width: 150,
      editable: false
    },
    {
      field: 'views',
      headerName: 'Views',
      width: 125,
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
      width: 225,
      editable: false
    },
    {
      field: 'updatedAt',
      headerName: 'Updated',
      width: 225,
      editable: false
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 225,
      editable: false
    },
    {
      field: 'source',
      headerName: 'Source',
      width: 250,
      editable: false
    },
    {
      field: 'sentences',
      headerName: 'Sentences',
      sortable: true,
      width: 150,
      valueGetter: (parameters) => `${parameters.row.sentences.length}`
    },
    {
      field: 'charters',
      headerName: 'Characters',
      sortable: true,
      width: 150,
      valueGetter: (parameters) => `${parameters.row.texts.arabic.length}`
    },
    {
      field: 'words',
      headerName: 'Words',
      sortable: true,
      width: 150,
      //the number of words in the sentences
      valueGetter: (parameters) => {
        const words = parameters.row.sentences.map((sentence) => sentence.words.length)
        return `${words.reduce((a, b) => a + b, 0)}`
      }
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
    api
      .getTexts()
      .then((data) => {
        setTexts(data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  const deleteText = () => {
    api
      .deleteText(selectedText)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((error) => console.log(error))

    const textsAfterDelete = texts.filter((item) => item.id !== selectedText)
    setTexts(textsAfterDelete)
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
          {texts !== undefined && <DataGrid rows={texts} columns={columns} pageSize={15} rowsPerPageOptions={[5]} />}
        </div>

        <Button variant="contained" component={Link} to="/texts/add">
          Add Text
        </Button>
        <Footer />
      </Container>
      <ConfirmationDialog
        openState={openDialog}
        handleCloseDialog={handleCloseDialog}
        handleAction={deleteText}
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
