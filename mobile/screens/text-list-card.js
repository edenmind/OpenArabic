/* eslint-disable putout/long-properties-destructuring */
import { truncate, removeLineBreak, addSpaceAfterDot } from '../services/utility-service.js'
import { Text, Card, Divider } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { StyleSheet } from 'react-native'
import { useSharedStyles } from '../styles/common.js'

const prepareIngress = (text, length) => {
  const noLineBreaks = removeLineBreak(text)
  const spaceAfterDot = addSpaceAfterDot(noLineBreaks)

  return truncate(spaceAfterDot, length)
}

export default function TextListCard(props) {
  const sharedStyle = useSharedStyles()

  const style = StyleSheet.create({
    card: {
      margin: 10
    },
    cardAction: {
      marginRight: 10,
      opacity: 0.7,
      paddingBottom: 15,
      paddingTop: 5
    },
    cardSubtitle: {
      paddingBottom: 25
    },
    cardTitle: {
      fontFamily: 'philosopher',
      lineHeight: 75
    }
  })

  //prepare the texts
  const subtitle = `${props.text.author} · ${props.text.category}`
  const footer = `${props.text.views} views · ${props.text.timeAgo} · ${props.text.readingTime}`
  const english = props.text.texts.english != undefined && prepareIngress(props.text.texts.english, 125)
  const arabic = props.text.texts.arabic != undefined && prepareIngress(props.text.texts.arabic, 100)

  return (
    <Card
      style={style.card}
      testID="textCard"
      mode="elevated"
      onPress={() => {
        props.setShouldReload(false)
        props.navigation.navigate(SCREENS.textScreen, {
          id: props.text.id
        })
      }}
    >
      <Card.Cover defaultSource={require('../assets/default.png')} source={{ uri: props.text.image }} />
      <Card.Title
        title={props.text.title}
        subtitle={subtitle}
        titleVariant="titleLarge"
        titleStyle={style.cardTitle}
        subtitleVariant="labelMedium"
        subtitleStyle={style.cardSubtitle}
      />
      <Card.Content>
        <Text style={sharedStyle.arabicBody}>{arabic}</Text>
        <Text variant="bodyLarge" style={sharedStyle.englishBody}>
          {english}
        </Text>
        <Divider style={sharedStyle.divider} />
      </Card.Content>
      <Card.Actions style={style.cardAction}>
        <Text variant="labelSmall">{footer}</Text>
      </Card.Actions>
    </Card>
  )
}

TextListCard.propTypes = {
  setShouldReload: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  text: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string,
    views: PropTypes.string,
    timeAgo: PropTypes.string,
    readingTime: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
    texts: PropTypes.object,
    category: PropTypes.string
  })
}
