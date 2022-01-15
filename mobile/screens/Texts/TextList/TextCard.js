import { StyleSheet } from 'react-native'
import { Card, Chip, Avatar, Paragraph } from 'react-native-paper'
import React from 'react'
import * as utility from '../../../services/UtilityService'
import PropTypes from 'prop-types'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    fontSize: 21,
    lineHeight: 30,
    writingDirection: 'rtl'
  },
  card: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#ffffff'
  },
  cardAction: {
    paddingBottom: 20,
    paddingLeft: 15,
    paddingTop: 20
  },
  chip: {
    backgroundColor: '#a4cfbe',
    padding: 0
  }
})

const LeftContent = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Avatar.Icon {...props} icon="book" mode="elevated" />
)

export default function TextCard(props) {
  return (
    <Card style={style.card}>
      <Card.Title
        title={props.text.title}
        subtitle={`${props.text.author} (${props.text.timeAgo})`}
        left={LeftContent}
      />
      <Card.Content>
        <Paragraph>
          {utility.removeLineBreak(
            utility.truncate(`${props.text.englishText}`, 155)
          )}
        </Paragraph>
        <Paragraph style={style.arabic}>
          {utility.removeLineBreak(
            utility.truncate(`${props.text.arabicText}`, 125)
          )}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={style.cardAction}>
        <Chip style={style.chip}>{props.text.category}</Chip>
      </Card.Actions>
    </Card>
  )
}

TextCard.propTypes = {
  text: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    timeAgo: PropTypes.string,
    englishText: PropTypes.string,
    arabicText: PropTypes.string,
    category: PropTypes.string
  })
}
