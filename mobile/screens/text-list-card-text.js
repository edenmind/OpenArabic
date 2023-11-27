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

  const footer = `${text.timeAgo} · ${text.views} views`

  const content = (
    <>
      <Card.Cover source={{ uri: text.image }} />
      <Card.Title title={text.title.trim()} subtitle={text.source.trim()} titleStyle={{ ...sharedStyle.cardTitle }} />
      <Card.Content>
        <Text variant="bodyMedium">{text.introduction.trim()}</Text>
      </Card.Content>
      <Card.Actions style={{ ...sharedStyle.cardAction }}>
        <Text variant="bodySmall" style={{ color: theme.colors.outline, left: 10, position: 'absolute' }}>
          {footer}
        </Text>
        <CategoryChip category={text.category} />
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
