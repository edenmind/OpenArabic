import { View, StyleSheet } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import React from 'react'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import { capitalizeFirstLetter } from '../services/utility-service.js'

const styles = StyleSheet.create({
  rowWrapper: {
    paddingBottom: 25
  }
})

// create a component for each word in the arabicWords array in the sentencesInText array for the currentSentence and wrap them with a button
const TextPracticeWords = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <View style={styles.rowWrapper}>
      {props.currentWordsInSentence.map((word, index) => (
        <Button
          key={index}
          testID={word.english}
          onPress={() => {
            props.handlePress(word.id, word.english)
          }}
          style={{ ...sharedStyle.buttonAnswer }}
        >
          <Text style={{ ...sharedStyle.answerText, fontSize: word.english.length > 25 ? 20 : 23 }}>
            {capitalizeFirstLetter(word.english)}
          </Text>
        </Button>
      ))}
    </View>
  )
}

export default TextPracticeWords

TextPracticeWords.propTypes = {
  currentWordsInSentence: PropTypes.array.isRequired,
  handlePress: PropTypes.func.isRequired
}
