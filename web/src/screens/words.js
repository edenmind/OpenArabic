import { Container, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import Footer from '../components/footer.js'
import { Link } from 'react-router-dom'
import Nav from '../components/nav.js'
import Progress from '../components/progress.js'
import React from 'react'
import * as api from '../services/api-service.js'

export default function Words() {
  const [words, setWords] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const columns = [
    {
      field: 'textId',
      headerName: 'Text',
      width: 250,
      editable: false
    },
    {
      field: 'sentenceId',
      headerName: 'Text',
      width: 250,
      editable: false
    },
    {
      field: 'wordId',
      headerName: 'Text',
      width: 250,
      editable: false
    },
    {
      field: 'arabic',
      headerName: 'Arabic',
      width: 250,
      editable: false
    },
    {
      field: 'english',
      headerName: 'English',
      width: 450,
      editable: false
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,

      getActions: (parameters) => [
        <Link
          to={`/words/update/${parameters.row.textId}/${parameters.row.sentenceId}/${parameters.row.wordId}`}
          key="link"
        >
          <Tooltip title="Edit word">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Link>
      ]
    }
  ]

  React.useEffect(() => {
    api
      .getWords()
      .then((data) => {
        console.log('data:', data)
        setWords(data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

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
              getRowId={(row) => row.textId + row.sentenceId + row.wordId}
              columns={columns}
              pageSize={15}
              rowsPerPageOptions={[5]}
              style={{ fontSize: '25px' }}
            />
          )}
        </div>
        <Footer />
      </Container>
    </React.Fragment>
  )
}
