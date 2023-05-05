import { Container, IconButton, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import Nav from '../components/nav.js'
import Progress from '../components/progress.js'
import React from 'react'
import * as api from '../services/api-service.js'
import { styled } from '@mui/system'

const ArabicCell = styled('div')({
  fontSize: 40
})

export default function Words() {
  const [words, setWords] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const columns = [
    {
      field: 'textId',
      headerName: 'Text',
      width: 400,
      editable: false
    },
    {
      field: 'sentenceId',
      headerName: 'Sentence',
      width: 250,
      editable: false
    },
    {
      field: 'wordId',
      headerName: 'Word',
      width: 250,
      editable: false
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 350,
      editable: false,
      valueGetter: (params) => {
        const date = new Date(params.row.date)
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false // use 24-hour time format
        }

        return date.toLocaleString('en-GB', options)
      }
    },
    {
      field: 'arabic',
      headerName: 'Arabic',
      width: 250,
      editable: false,
      renderCell: (params) => <ArabicCell>{params.value}</ArabicCell>
    },
    {
      field: 'english',
      headerName: 'English',
      width: 450,
      editable: false
    },
    {
      field: 'grammar',
      headerName: 'Grammar',
      width: 200,
      editable: false,
      valueGetter: (params) => {
        return params.row.grammar ? params.row.grammar.length : ''
      }
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
        data.sort((a, b) => new Date(b.date) - new Date(a.date))
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
        <div style={{ height: 1100, width: '100%', paddingBottom: '35px', fontSize: '17px' }}>
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
      </Container>
    </React.Fragment>
  )
}
