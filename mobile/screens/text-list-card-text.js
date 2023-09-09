import PropTypes from 'prop-types'
import React from 'react'
import { Card, Divider, useTheme, IconButton } from 'react-native-paper'

import { CardFooter } from '../components/card-footer.js'
import { PressableCard } from '../components/pressable-card.js'
import TextCategoryIntro from '../components/text-category-intro.js'
import SCREENS from '../constants/screens.js'
import { generateShare } from '../services/ui-services.js'
import { useSharedStyles } from '../styles/common.js'

export default function TextListCardText({ setShouldReload, navigation, text }) {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const subtitle = `${text.author} in #${text.category}`

  const onPress = () => {
    setShouldReload(false)
    navigation.navigate(SCREENS.textScreen, {
      id: text.id
    })
  }

  const content = (
    <>
      <Card.Cover defaultSource={require('../assets/default.png')} source={{ uri: text.image }} />
      <Card.Title
        title={text.title}
        subtitle={subtitle}
        titleVariant="headlineSmall"
        titleStyle={{ ...sharedStyle.cardTitle }}
        subtitleVariant="labelMedium"
        subtitleStyle={{ ...sharedStyle.cardSubTitle }}
        right={(props) => <IconButton {...props} icon="share-variant-outline" onPress={generateShare(text)} />}
      />
      <Card.Content>
        <TextCategoryIntro text={text.introduction} />
        <Divider style={{ ...sharedStyle.divider }} />
      </Card.Content>
      <Card.Actions style={{ ...sharedStyle.cardAction }}>
        <CardFooter text={text} />
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
