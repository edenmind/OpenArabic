import { Divider, useTheme } from 'react-native-paper'
import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { formatGrammar } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextGrammar({ route }) {
  const { grammar } = route.params
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
      {formatGrammar(grammar, sharedStyle)}
      <Divider style={{ marginBottom: 50 }} />
    </ScrollView>
  )
}

TextGrammar.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      grammar: PropTypes.string.isRequired
    })
  })
}
