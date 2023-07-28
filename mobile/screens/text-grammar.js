import { Divider, useTheme, Text } from 'react-native-paper'
import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { formatGrammar } from '../services/ui-services.js'
import { transliterateArabicToEnglish } from '../services/utility-service.js'
import { useSharedStyles } from '../styles/common.js'
import PlaySound from '../components/play-sound.js'

export default function TextGrammar({ route }) {
  const { grammar, arabic, english, filename } = route.params
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const style = StyleSheet.create({
    scrollView: {
      padding: 15,
      paddingBottom: 55
    }
  })

  const transliteratedArabic = transliterateArabicToEnglish(arabic)

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
        {english} - {transliteratedArabic}
      </Text>

      <PlaySound
        audioFileName={`https://openarabic.ams3.digitaloceanspaces.com/audio/${filename}`}
        buttonText={'Play'}
      />
      <Divider style={{ marginBottom: 20, opacity: 0 }} />
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
      english: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired
    })
  })
}
