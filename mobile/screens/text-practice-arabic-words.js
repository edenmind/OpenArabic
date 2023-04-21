import { View, Platform, StyleSheet } from 'react-native'
import { Text, Button, useTheme } from 'react-native-paper'
import React from 'react'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  rowWrapper: {
    paddingBottom: 25
  }
})

// create a component for each word in the arabicWords array in the sentencesInText array for the currentSentence and wrap them with a button
const TextPracticeArabicWords = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <View style={styles.rowWrapper}>
      {props.currentArabicWordsInSentence.map((word, index) => (
        <Button
          key={index}
          testID={word.arabic}
          onPress={() => {
            //find the matching english word and and log it to the console
            props.handlePress(word.id, word.arabic)
          }}
          mode="elevated"
          style={{ ...sharedStyle.buttonAnswer, height: 90 }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: '600',

              lineHeight: Platform.OS === 'android' ? 90 : 70,
              color: theme.colors.primary
            }}
          >
            {word.arabic}
          </Text>
        </Button>
      ))}
    </View>
  )
}

export default TextPracticeArabicWords

TextPracticeArabicWords.propTypes = {
  currentArabicWordsInSentence: PropTypes.array.isRequired,
  handlePress: PropTypes.func.isRequired
}
