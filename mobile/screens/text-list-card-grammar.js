import { Text, Card, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import { CardFooter } from '../components/card-footer.js'
import { useSharedStyles } from '../styles/common.js'
import { CategoryChip } from '../components/category-chip.js'
import { PressableCard } from '../components/pressable-card.js'
import SCREENS from '../constants/screens.js'

export default function TextListCardGrammar({ text, navigation, setShouldReload }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const onPress = () => {
    setShouldReload(false)
    navigation.navigate(SCREENS.textGrammar, {
      grammar: text.grammar,
      arabic: text.arabic,
      english: text.english,
      filename: text.filename
    })
  }

  const content = (
    <Card.Content>
      <CategoryChip category="GRAMMAR" />
      <Text
        style={{
          fontFamily: 'uthman',
          width: '97%',
          fontSize: 100,
          textAlign: 'center',
          color: theme.colors.secondary,
          paddingBottom: 15
        }}
      >
        {text.arabic}
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
        {text.english.charAt(0).toUpperCase() + text.english.slice(1)}
      </Text>
      <Card.Actions style={{ ...sharedStyle.card }}>
        <CardFooter text={text} />
      </Card.Actions>
    </Card.Content>
  )

  return <PressableCard content={content} onPress={onPress} />
}

TextListCardGrammar.propTypes = {
  navigation: PropTypes.object.isRequired,
  setShouldReload: PropTypes.func.isRequired,
  text: PropTypes.shape({
    filename: PropTypes.string,
    id: PropTypes.string,
    timeAgo: PropTypes.string,
    category: PropTypes.string,
    english: PropTypes.string,
    arabic: PropTypes.string,
    grammar: PropTypes.string,
    publishDate: PropTypes.string
  })
}
