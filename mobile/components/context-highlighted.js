import React, { useRef, useEffect } from 'react'
import { View, Animated } from 'react-native'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import { useSharedStyles } from '../styles/common.js'
import { paperDarkTheme } from '../constants/paper-theme.js'

const WordsContextHighLighted = (props) => {
  const sharedStyle = useSharedStyles()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start()
  }, [fadeAnim])

  const rowWrapper = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 10,
    margin: 0,
    padding: 0
  }

  const highlightWords = (sentence, words) => {
    return sentence.map((word, index) => {
      if (word.id === words.id) {
        return <HighlightedWord word={word} key={index} />
      }

      return (
        <Text style={{ ...sharedStyle.englishBody, marginHorizontal: 2, paddingBottom: 0 }} key={index}>
          {word.english}
        </Text>
      )
    })
  }

  return (
    <View>
      <View style={rowWrapper}>{highlightWords(props.englishSentence, props.englishWord)}</View>
      <Text style={{ ...sharedStyle.arabicBody, paddingBottom: 10 }}>
        {props.arabicSentence}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={{ ...sharedStyle.arabicBody }}>...</Text>
        </Animated.View>
      </Text>
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  englishSentence: PropTypes.array.isRequired,
  arabicSentence: PropTypes.string.isRequired,
  englishWord: PropTypes.object.isRequired
}

export default WordsContextHighLighted

const HighlightedWord = ({ word }) => {
  const sharedStyle = useSharedStyles()
  return (
    <Text
      style={{
        ...sharedStyle.englishBody,
        color: paperDarkTheme.colors.onPrimary,
        backgroundColor: paperDarkTheme.colors.primary,
        opacity: 1,
        marginHorizontal: 2,
        paddingHorizontal: 2,
        paddingBottom: 0
      }}
      variant="bodyLarge"
    >
      {word.english}
    </Text>
  )
}

HighlightedWord.propTypes = {
  word: PropTypes.string.isRequired
}
