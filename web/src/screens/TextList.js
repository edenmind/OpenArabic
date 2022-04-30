import * as apiService from '../services/apiService'

import { Box, Grid } from '@mui/material'
import React, { Fragment } from 'react'

import Progress from '../components/Progress'
import PropTypes from 'prop-types'
import TextListCard from './TextListCard'

const TextList = (props) => {
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

  return isLoading ? (
    <Progress />
  ) : (
    <Fragment>
      <h2>{props.heading}</h2>
      <h4>{props.subHeading}</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <TextListCard texts={texts} />
        </Grid>
      </Box>
    </Fragment>
  )
}

TextList.propTypes = {
  heading: PropTypes.node,
  subHeading: PropTypes.node,
  id: PropTypes.string,
}

export default TextList
