/* eslint-disable putout/long-properties-destructuring */
import { truncate, removeLineBreak, addSpaceAfterDot } from '../services/utility-service.js'
import { Text, Card, Divider } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import SCREENS from '../constants/screens.js'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const arabicSelector = (state) => state.arabicFontSize
const englishSelector = (state) => state.englishFontSize

const prepareIngress = (text, length) => {
  const noLineBreaks = removeLineBreak(text)
  const spaceAfterDot = addSpaceAfterDot(noLineBreaks)

  return truncate(spaceAfterDot, length)
}

export default function CategoryCard(props) {
  // get arabic front size from redux

  //load arabic font size from redux on every render of this component with useFocusEffect
  const { arabicFontSize } = useSelector(arabicSelector)
  const { englishFontSize } = useSelector(englishSelector)

  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      fontFamily: 'uthmanic',
      fontSize: arabicFontSize,
      lineHeight: 60,
      opacity: 0.8,
      paddingBottom: 15,
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
      opacity: 0.7,
      paddingBottom: 20,
      paddingTop: 20
    },
    cardSubtitle: {
      paddingBottom: 25
    },
    cardTitle: {
      fontFamily: 'philosopher',
      lineHeight: 55
    },
    divider: {
      marginBottom: 0,
      marginTop: 20
    },
    english: {
      direction: 'ltr',
      fontFamily: 'philosopher',
      fontSize: englishFontSize,
      opacity: 0.9
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
        <Text style={style.arabic}>{arabic}</Text>
        <Text variant="bodyLarge" style={style.english}>
          {english}
        </Text>
        <Divider style={style.divider} />
      </Card.Content>
      <Card.Actions style={style.cardAction}>
        <Text variant="labelSmall">{footer}</Text>
      </Card.Actions>
    </Card>
  )
}

CategoryCard.propTypes = {
  setShouldReload: PropTypes.func.isRequired,
  navigation: PropTypes.object,
  text: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
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
