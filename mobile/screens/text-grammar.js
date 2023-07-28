import { Divider, useTheme, Text } from 'react-native-paper'
import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { formatGrammar } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextGrammar({ route }) {
  const { grammar, arabic, english } = route.params
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const style = StyleSheet.create({
    scrollView: {
      padding: 15,
      paddingBottom: 55
    }
  })

  return (
    <ScrollView style={style.scrollView}>
      <Text
        style={{
          fontFamily: 'uthman',
          width: '97%',
          fontSize: 100,
          textAlign: 'center',
          color: theme.colors.secondary
        }}
      >
        {arabic}
      </Text>
      <Text
        style={{
          width: '97%',
          fontFamily: 'philosopher',
          fontSize: 25,
          textAlign: 'center',
          color: theme.colors.tertiary,
          paddingBottom: 50
        }}
      >
        {english}
      </Text>
      {formatGrammar(grammar, sharedStyle)}
      <Divider style={{ marginBottom: 50, opacity: 0 }} />
    </ScrollView>
  )
}

TextGrammar.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      grammar: PropTypes.string.isRequired,
      arabic: PropTypes.string.isRequired,
      english: PropTypes.string.isRequired
    })
  })
}
