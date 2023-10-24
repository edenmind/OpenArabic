import PropTypes from 'prop-types'
import React from 'react'
import { Card, useTheme, Text } from 'react-native-paper'

import { CategoryChip } from '../components/category-chip.js'
import { PressableCard } from '../components/pressable-card.js'
import SCREENS from '../constants/screens.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextListCardText({ setShouldReload, navigation, text }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const onPress = () => {
    setShouldReload(false)
    navigation.navigate(SCREENS.textScreen, {
      id: text.id
    })
  }

  const numberOfWordsInText = text?.sentences?.reduce((acc, sentence) => acc + sentence?.words?.length, 0) ?? 0

  const content = (
    <>
      <Card.Cover source={{ uri: text.image }} />
      <Card.Title title={text.title} subtitle={text.category} titleStyle={{ ...sharedStyle.cardTitle }} />
      <Card.Content>
        <Text variant="bodyMedium">{text.introduction}</Text>
      </Card.Content>
      <Card.Actions style={{ ...sharedStyle.cardAction }}>
        <Text variant="bodySmall" style={{ color: theme.colors.outline, left: 10, position: 'absolute' }}>
          {text.source}
        </Text>
        <CategoryChip category={`${numberOfWordsInText} words`} />
      </Card.Actions>
    </>
  )

  return <PressableCard onPress={onPress} content={content} />
}

TextListCardText.propTypes = {
  navigation: PropTypes.object.isRequired,
  setShouldReload: PropTypes.func.isRequired,
  text: PropTypes.shape({
    arabic: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.string,
    createdAt: PropTypes.string,
    english: PropTypes.string,
    id: PropTypes.string,
    image: PropTypes.string,
    introduction: PropTypes.string,
    readingTime: PropTypes.string,
    sentences: PropTypes.array,
    slug: PropTypes.string,
    source: PropTypes.string,
    texts: PropTypes.object,
    timeAgo: PropTypes.string,
    title: PropTypes.string,
    views: PropTypes.string
  })
}
