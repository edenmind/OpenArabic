import React, { Fragment } from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export const TextListHeadingHome = (properties) => {
  return (
    <Fragment>
      <Card sx={{ minWidth: 275, marginBottom: '35px', marginTop: '35px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 25, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
            بسم الله الرحمن الرحيم
          </Typography>
          <Typography variant="h4" component="div" sx={{ fontWeight: 'medium' }}>
            {properties.heading}
          </Typography>

          <Typography variant="body1">
            <p>
              OpenArabic is a free and open-source Arabic language learning platform with a focus on classic Islamic
              texts. The target audience is primarily non-native speakers of Arabic who are interested in learning the
              language for the purpose of reading the Quran and other Islamic texts.
            </p>
            <p>
              OpenArabic is based upon the Qurʼān, the Prophetic Sunnah and the first generations of Muslims
              understanding with texts from Islamic Scholars such as: al-Hasan al-Basri, Imām Abū Ḥanīfa, Imām Mālik bin
              Anas, Imām al-Shāfiʿī, Imām Aḥmad ibn Ḥanbal, Ibn Rājab al-Hanbali, Ibn Taymiyyah, Ibn Qayyim al-Jawziyya,
              Shams ad-Dīn adh-Dhahabī, Imām Nawawī, Ibn Kathīr, Ibn Ḥajar al-ʿAsqalānī and al-Fuḍayl ibn ʻIyāḍ.
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
