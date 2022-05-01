/* eslint-disable react/react-in-jsx-scope */
import * as apiService from '../services/api-service'

import { Box, Grid } from '@mui/material'
import React, { Fragment } from 'react'

import Progress from '../components/progress'
import TextListCard from './text-list-card'

const TextList = (properties) => {
  const [texts, setTexts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    apiService
      .getTexts(properties.id)
      .then((data) => {
        setTexts(data)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [properties.id])

  return isLoading ? (
    <Progress />
  ) : (
    <Fragment>
      <h2>{properties.heading}</h2>
      <h4>{properties.subHeading}</h4>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <TextListCard texts={texts} />
        </Grid>
      </Box>
    </Fragment>
  )
}

export default TextList
