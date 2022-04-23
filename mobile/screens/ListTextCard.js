/* eslint-disable import/namespace */
import * as utility from '../services/UtilityService'

import { Card, Chip, Paragraph } from 'react-native-paper'
import { Pressable, StyleSheet } from 'react-native'

import { COLORS } from '../constants/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { SCREENS } from '../constants/screens'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    fontSize: 18,
    lineHeight: 30,
    writingDirection: 'rtl'
  },
  card: {
    backgroundColor: COLORS.white,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10
  },
  cardAction: {
    paddingBottom: 20,
    paddingLeft: 15,
    paddingTop: 20
  },
  chip: {
    backgroundColor: COLORS.leaf,
    padding: 0
  }
})

const prepareIngress = (text, length) => {
  const noLineBreaks = utility.removeLineBreak(text)
  return utility.truncate(noLineBreaks, length)
}

export default function ListTextCard(props) {
  return (
    <Pressable
      onPress={() => {
        props.setShouldReload(false)
        props.navigation.navigate(SCREENS.textScreen, {
          id: props.text.id
        })
      }}>
      <Card style={style.card} testID="textCard">
        <Card.Title
          title={props.text.title}
          subtitle={`${props.text.author} in ${props.text.source}`}
        />
        <Card.Content>
          <Paragraph>{prepareIngress(props.text.texts.english, 125)}</Paragraph>
          <Paragraph style={style.arabic}>
            {prepareIngress(props.text.texts.arabic, 100)}
          </Paragraph>
        </Card.Content>
        <Card.Actions style={style.cardAction}>
          <Chip style={style.chip}>{props.text.category}</Chip>
        </Card.Actions>
      </Card>
    </Pressable>
  )
}

ListTextCard.propTypes = {
  setShouldReload: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  text: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
    texts: PropTypes.object,
    category: PropTypes.string
  })
}
