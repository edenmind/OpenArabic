import React, { Fragment } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { getHijriDate } from '../services/dates.js'

export const TextListHeadingHome = (properties) => {
  return (
    <Fragment>
      <Card sx={{ minWidth: 275, marginBottom: '35px', marginTop: '35px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 25, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
            بسم الله الرحمن الرحيم
          </Typography>
          <p>{getHijriDate()}</p>
          <Typography variant="h4" sx={{ fontWeight: 'medium' }}>
            {properties.heading}
          </Typography>
          <Typography variant="body1">
            <p>
              OpenArabic is a complimentary and open-source platform dedicated to the learning of the Arabic language,
              with a special emphasis on classic Islamic texts. It primarily caters to non-native speakers of Arabic who
              are keen to acquire the language skills necessary for comprehending the Quran and other Islamic
              literature.
            </p>
          </Typography>
          <Typography sx={{ mb: 1.5 }}>
            <h4>{properties.subHeading}</h4>
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  )
}
