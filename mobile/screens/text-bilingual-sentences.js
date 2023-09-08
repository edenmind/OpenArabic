import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { Divider, useTheme } from 'react-native-paper'

import { EnglishArabic } from '../components/english-arabic.js'
import { useSharedStyles } from '../styles/common.js'

function TextBilingualSentences({ sentences }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const renderedSentences = sentences.map((sentence, index) => (
    <View key={index} style={[sharedStyle.container, { marginTop: 10, marginBottom: 10 }]}>
      <EnglishArabic sentence={sentence} />

      <Divider style={{ ...sharedStyle.dividerHidden }} />
    </View>
  ))

  return <>{renderedSentences}</>
}

TextBilingualSentences.propTypes = {
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
      words: PropTypes.array.isRequired
    })
  ).isRequired
}

export default React.memo(TextBilingualSentences)
