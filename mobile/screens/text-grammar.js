import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { Divider, useTheme, Text } from 'react-native-paper'

import { formatGrammar } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextGrammar({ route }) {
  const { grammar, arabic, english } = route.params
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <ScrollView style={sharedStyle.scrollViewLTR}>
      <Text
        style={{
          color: theme.colors.primary,
          fontFamily: 'uthman',
          fontSize: 100,
          paddingBottom: 15,
          textAlign: 'center',
          width: '97%'
        }}
      >
        {arabic}
      </Text>
      <Text
        style={{
          color: theme.colors.onSurface,
          fontFamily: 'philosopher',
          fontSize: 25,
          paddingBottom: 25,
          textAlign: 'center',
          width: '97%'
        }}
      >
        {english.charAt(0).toUpperCase() + english.slice(1)}
      </Text>

      <Divider style={{ marginBottom: 30, opacity: 0 }} />
      {formatGrammar(grammar, sharedStyle)}
      <Divider style={{ marginBottom: 50, opacity: 0 }} />
    </ScrollView>
  )
}

TextGrammar.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
      grammar: PropTypes.string.isRequired
    })
  })
}
