/* eslint-disable import/namespace */
import * as utility from '../services/utility-service.js'
import { Caption, Card, Paragraph } from 'react-native-paper'
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
  return utility.truncate(noLineBreaks, length)
}

export default function CategoryCard(props) {
  const category = `#${props.text.category.toLowerCase()}`

  return (
    <PressableOpacity
      onPress={() => {
        props.setShouldReload(false)
        props.navigation.navigate(SCREENS.textScreen, {
          id: props.text.id
        })
      }}
    >
      <Card style={style.card} testID="textCard">
        <Card.Cover source={{ uri: props.text.image }} />
        <Card.Title title={props.text.title} subtitle={`${props.text.author} — ${props.text.source}`} />
        <Card.Content>
          <Paragraph>{prepareIngress(props.text.texts.english, 125)}</Paragraph>
          <Paragraph style={style.arabic}>{prepareIngress(props.text.texts.arabic, 100)}</Paragraph>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
    texts: PropTypes.object,
    category: PropTypes.string
  })
}
