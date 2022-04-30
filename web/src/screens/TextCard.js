import * as apiService from '../services/apiService'

import { Box, Grid } from '@mui/material'
import React, { Fragment } from 'react'

import Progress from '../components/Progress'
import PropTypes from 'prop-types'
import TextCardList from './TextCardList'
import { useAuth0 } from '@auth0/auth0-react'

const TextCard = (props) => {
  const { isAuthenticated } = useAuth0()

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
          <TextCardList texts={texts} isAuthenticated={isAuthenticated} />
        </Grid>
      </Box>
    </Fragment>
  )
}

TextCard.propTypes = {
  heading: PropTypes.node,
  subHeading: PropTypes.node,
  id: PropTypes.string,
}

export default TextCard
