import PropTypes from 'prop-types'
import React from 'react'
import { Text, Card, useTheme } from 'react-native-paper'

import { CardFooter } from '../components/card-footer.js'
import { CategoryChip } from '../components/category-chip.js'
import { PressableCard } from '../components/pressable-card.js'
import SCREENS from '../constants/screens.js'
import { useSharedStyles } from '../styles/common.js'

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

  const content = (
    <>
      <Card.Content>
        <CategoryChip category="GRAMMAR" />
        <Text
          style={{
            color: theme.colors.secondary,
            fontFamily: 'uthman',
            fontSize: 100,
            paddingBottom: 15,
            textAlign: 'center',
            width: '97%'
          }}
        >
          {text.arabic}
        </Text>
        <Text
          style={{
            color: theme.colors.tertiary,
            fontFamily: 'philosopher',
            fontSize: 25,
            paddingBottom: 15,
            textAlign: 'center',
            width: '97%'
          }}
        >
          {text.english.charAt(0).toUpperCase() + text.english.slice(1)}
        </Text>
      </Card.Content>
      <Card.Actions style={{ ...sharedStyle.cardAction }}>
        <CardFooter text={text} />
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
