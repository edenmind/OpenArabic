import PropTypes from 'prop-types'
import React from 'react'
import { Text, Card, useTheme } from 'react-native-paper'

import { PressableCard } from '../components/pressable-card.js'
import SCREENS from '../constants/screens.js'

export default function TextListCardGrammar({ text, navigation, setShouldReload }) {
  const theme = useTheme()

  const onPress = () => {
    setShouldReload(false)
    navigation.navigate(SCREENS.textGrammar, {
      arabic: text.arabic,
      english: text.english,
      filename: text.filename,
      grammar: text.grammar
    })
  }

  const content = (
    <Card.Content>
      <Text
        style={{
          color: theme.colors.primary,
          fontFamily: 'uthman',
          fontSize: 100,
          paddingBottom: 10,
          textAlign: 'center'
        }}
      >
        {text.arabic}
      </Text>
      <Text
        style={{
          color: theme.colors.secondary,
          fontFamily: 'philosopher',
          fontSize: 25,
          paddingBottom: 45,
          textAlign: 'center'
        }}
      >
        {text.english.charAt(0).toUpperCase() + text.english.slice(1)}
      </Text>
    </Card.Content>
  )

  return <PressableCard content={content} onPress={onPress} />
}

TextListCardGrammar.propTypes = {
  navigation: PropTypes.object.isRequired,
  setShouldReload: PropTypes.func.isRequired,
  text: PropTypes.shape({
    arabic: PropTypes.string,
    category: PropTypes.string,
    english: PropTypes.string,
    filename: PropTypes.string,
    grammar: PropTypes.string,
    id: PropTypes.string,
    publishDate: PropTypes.string,
    timeAgo: PropTypes.string
  })
}
