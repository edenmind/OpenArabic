/* eslint-disable import/namespace */
import * as utility from '../services/utility-service.js'

import { Caption, Card, Paragraph, Text } from 'react-native-paper'

import COLORS from '../constants/colors.js'
import PressableOpacity from '../components/pressable-opacity.js'
import PropTypes from 'prop-types'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    fontSize: 18,
    lineHeight: 30,
    writingDirection: 'rtl'
  },
  card: {
    backgroundColor: COLORS.shinyOlive,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  cardAction: {
    marginLeft: 10,
    paddingBottom: 20,
    paddingTop: 20
  }
})

const prepareIngress = (text, length) => {
  const noLineBreaks = utility.removeLineBreak(text)
  const spaceAfterDot = utility.addSpaceAfterDot(noLineBreaks)

  return utility.truncate(spaceAfterDot, length)
}

export default function CategoryCard(props) {
  //prepare hte texts
  const category = `#${props.text.category.toLowerCase()}`
  const subtitle = `${props.text.author} · ${props.text.views} views · ${props.text.timeAgo}`
  const english = props.text.texts.english != undefined && prepareIngress(props.text.texts.english, 125)
  const arabic = props.text.texts.arabic != undefined && prepareIngress(props.text.texts.arabic, 100)

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
        <Card.Cover source={{ uri: props.text.image }} />
        <Card.Title title={props.text.title} subtitle={subtitle} />
        <Card.Content>
          <Paragraph>{english}</Paragraph>
          <Paragraph style={style.arabic}>{arabic}</Paragraph>
        </Card.Content>
        <Card.Actions style={style.cardAction}>
          <Caption>{category}</Caption>
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
