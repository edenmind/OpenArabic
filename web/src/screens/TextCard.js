import * as apiService from '../services/apiService'

import { Box, Grid } from '@mui/material'
import React, { Fragment } from 'react'

import Progress from '../components/Progress'
import PropTypes from 'prop-types'
import SnackBar from '../components/SnackBar'
import TextCardList from './TextCardList'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'

const TextCard = (props) => {
  const { isAuthenticated } = useAuth0()
  const [openSnackBar, setOpenSnackbar] = React.useState(false)
  const [texts, setTexts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    apiService
      .getTexts(props.id)
      .then((data) => {
        setTexts(data)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [props.id])

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  const handleDeleteClick = (textId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/texts/${textId}`)
      .then((response) => {
        if (response.status === 200) {
          setOpenSnackbar(true)
        }
      })
      .catch((err) => console.log(err))

    // const newTexts = texts.filter((item) => item._id !== id)
    // setTexts(newTexts)
  }

  return isLoading ? (
    <Progress />
  ) : (
    <Fragment>
      <h2>{props.heading}</h2>
      <h4>{props.subHeading}</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <TextCardList texts={texts} handleDeleteClick={handleDeleteClick} isAuthenticated={isAuthenticated} />
        </Grid>
      </Box>
      <SnackBar openSnackBar={openSnackBar} handleCloseSnackbar={handleCloseSnackbar} severity='success' message='Text deleted!' />
    </Fragment>
  )
}

TextCard.propTypes = {
  heading: PropTypes.node,
  subHeading: PropTypes.node,
  id: PropTypes.string,
}

export default TextCard
