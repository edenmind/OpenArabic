import PropTypes from 'prop-types'
import React from 'react'
import { Text, Card, useTheme } from 'react-native-paper'

import { CategoryChip } from '../components/category-chip.js'
import { PressableCard } from '../components/pressable-card.js'
import SCREENS from '../constants/screens.js'
import { useSharedStyles } from '../styles/common.js'

const styledText = (text, style) => {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1)
  return <Text style={style}>{capitalizedText}</Text>
}

export default function TextListCardGrammar({ text, navigation, setShouldReload }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const onPress = () => {
    setShouldReload(false)
    navigation.navigate(SCREENS.textGrammar, {
      arabic: text.arabic,
      english: text.english,
      filename: text.filename,
      grammar: text.grammar
    })
  }

  const footer = `${text.timeAgo}`
  const centerAlignment = 'center'

  const content = (
    <>
      <Card.Content>
        {styledText(text.arabic, {
          color: theme.colors.primary,
          fontFamily: 'uthman',
          fontSize: 100,
          paddingBottom: 10,
          textAlign: centerAlignment
        })}
        {styledText(text.english, {
          color: theme.colors.secondary,
          fontFamily: 'philosopher',
          fontSize: 25,
          paddingBottom: 45,
          textAlign: centerAlignment
        })}
      </Card.Content>
      <Card.Actions style={{ ...sharedStyle.cardAction }}>
        <Text variant="bodySmall" style={{ color: theme.colors.outline, left: 10, position: 'absolute' }}>
          {footer}
        </Text>
        <CategoryChip category={text.category} />
      </Card.Actions>
    </>
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
