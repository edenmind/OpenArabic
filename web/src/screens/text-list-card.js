import * as wordProcessing from '../services/word-processing.js'
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import PropTypes from 'prop-types'

function TextListCard(properties) {
  return properties.texts
    .filter((order) => order.status !== 'Draft')
    .map((text, index) => (
      <Grid item md={4} xs={12} key={index}>
        <Card>
          <CardActionArea href={`/texts/${text.id}`}>
            <CardMedia component="img" height="194" image={text.image} />
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {text.category}
              </Typography>
              <Typography variant="h5" component="div">
                {text.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {text.author}
              </Typography>
              <div dir="rtl">
                <Typography variant="h5">
                  {text.texts.arabic != undefined && wordProcessing.truncate(text.texts.arabic, 125)}
                </Typography>
              </div>
              <div dir="ltr">
                <br />
                <Typography>
                  {text.texts.english != undefined && wordProcessing.truncate(text.texts.english, 125)}
                </Typography>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    ))
}

TextListCard.propTypes = {
  texts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isOptional,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired
    })
  )
}

export default TextListCard
