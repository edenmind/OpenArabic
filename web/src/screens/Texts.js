import * as apiService from '../services/apiService'

import { Button, Container } from '@mui/material'

import { DataGrid } from '@mui/x-data-grid'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Progress from '../components/Progress'
import React from 'react'

export default function Texts() {
  const [texts, setTexts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
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
        <Link to={`/texts/${params.row.id}`}>
          <Button size='small'>Edit</Button>
        </Link>,
        <Link to={`/texts/${params.row.id}`}>
          <Button size='small'>Delete</Button>
        </Link>,
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

  return isLoading ? (
    <Progress />
  ) : (
    <React.Fragment>
      <Nav />
      <Container maxWidth='false'>
        <h2>Texts</h2>
        <div style={{ height: 800, width: '100%' }}>
          <DataGrid rows={texts} columns={columns} pageSize={15} rowsPerPageOptions={[5]} />
        </div>
        <br />
        <br />
        <Link to='/texts/add'>
          <Button variant='contained'>Add</Button>
        </Link>
        <Footer />
      </Container>
    </React.Fragment>
  )
}
