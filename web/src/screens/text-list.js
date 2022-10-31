import * as api from '../services/api-service.js'
import { Box, Grid } from '@mui/material'
import React, { Fragment } from 'react'
import Progress from '../components/progress.js'
import TextListCard from './text-list-card.js'
import { TextListHeadingHome } from './text-list-heading-home.js'
import { TextListHeadingCategory } from './text-list-heading-category.js'

const TextList = (properties) => {
  const [texts, setTexts] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    document.title = 'OpenArabic'

    if (properties.id) {
      // if id is set, fetch the text in category
      api
        .getTextsCategory(properties.id)
        .then((data) => {
          setTexts(data)
          setIsLoading(false)
        })
        .catch((error) => console.log(error))
    } else {
      // if id is not set, fetch all texts for homepage
      api
        .getTexts()
        .then((data) => {
          setTexts(data)
          setIsLoading(false)
        })
        .catch((error) => console.log(error))
    }
  }, [properties.id])

  return isLoading ? (
    <Progress />
  ) : (
    <Fragment>
      {properties.id ? (
        <TextListHeadingCategory heading={properties.heading} subHeading={properties.subHeading} />
      ) : (
        // if id is not set, show the heading
        <TextListHeadingHome heading={properties.heading} subHeading={properties.subHeading} />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <TextListCard texts={texts} />
        </Grid>
      </Box>
    </Fragment>
  )
}

export default TextList
