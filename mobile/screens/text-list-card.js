import { truncate, removeLineBreak, addSpaceAfterDot } from '../services/utility-service.js'
import { Text, Card, Divider } from 'react-native-paper'
import PressableOpacity from '../components/pressable-opacity.js'
import PropTypes from 'prop-types'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { StyleSheet, Image } from 'react-native'
import icon from '../assets/1500x500.jpeg'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    fontSize: 18,
    lineHeight: 30,
    paddingBottom: 10,
    writingDirection: 'rtl'
  },
  card: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  cardAction: {
    marginRight: 13,
    paddingBottom: 20,
    paddingTop: 20
  },
  divider: {
    marginBottom: 0,
    marginTop: 20
  }
})

const prepareIngress = (text, length) => {
  const noLineBreaks = removeLineBreak(text)
  const spaceAfterDot = addSpaceAfterDot(noLineBreaks)

  return truncate(spaceAfterDot, length)
}

export default function CategoryCard(props) {
  //prepare hte texts
  const subtitle = `${props.text.author} · ${props.text.source}`
  const footer = `#${props.text.category.toLowerCase()} · ${props.text.readingTime} · ${props.text.views} views · ${
    props.text.timeAgo
  }`
  const english = props.text.texts.english != undefined && prepareIngress(props.text.texts.english, 125)
  const arabic = props.text.texts.arabic != undefined && prepareIngress(props.text.texts.arabic, 100)

  const image = <Image source={icon} style={style.icon} />

  return (
    <PressableOpacity
      testID="pressableOpacity"
      onPress={() => {
        props.setShouldReload(false)
        props.navigation.navigate(SCREENS.textScreen, {
          id: props.text.id
        })
      }}
    >
      <Card style={style.card} testID="textCard" mode="elevated">
        <Card.Cover defaultSource={require('../assets/default.png')} source={{ uri: props.text.image }} />
        <Card.Title title={props.text.title} subtitle={subtitle} />
        <Card.Content>
          <Text variant="titleLarge" style={style.arabic}>
            {arabic}
          </Text>
          <Text variant="bodyMedium">{english}</Text>
          <Divider style={style.divider} />
        </Card.Content>
        <Card.Actions style={style.cardAction}>
          <Text variant="labelSmall" style={style.footer}>
            {footer}
          </Text>
        </Card.Actions>
      </Card>
    </PressableOpacity>
  )
}

CategoryCard.propTypes = {
  setShouldReload: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  text: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    views: PropTypes.number,
    timeAgo: PropTypes.string,
    readingTime: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
    texts: PropTypes.object,
    category: PropTypes.string
  })
}
