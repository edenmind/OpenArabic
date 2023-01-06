/* eslint-disable prettier/prettier */
/* eslint-disable putout/newline-function-call-arguments */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react'
import { View } from 'react-native'
import { Text, Chip } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import { paperDarkTheme } from '../constants/paper-theme.js'

const WordsContextHighLighted = (props) => {
  const sharedStyle = useSharedStyles()

  //style for highlighted word
  const highlightedWord = {
    color: paperDarkTheme.colors.onPrimary,
    backgroundColor: paperDarkTheme.colors.primary
  }

  //split the sentence into an array of words
  const splitSentence = (sentence) => {
    return sentence.split(' ')
  }

  // highlight a word in splitSentence
  const highlightWord = (sentence, word, style) => {
    const splitSentenceArray = splitSentence(sentence)
    const highlightedSentence = splitSentenceArray.map((wordInSentence, index) => {
      if (wordInSentence === word) {
        return (
          <>
            <Text style={highlightedWord} key={index} variant="bodyLarge>">
              {' ' + wordInSentence + ' '}
            </Text>
            <Text> </Text>
          </>
        )
      }

      // file deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
      // deepcode ignore ReactMissingArrayKeys: <please specify a reason of ignoring this>
      return (
        <Text style={style} key={index}>
          {wordInSentence + ' '}
        </Text>
      )
    })

    return highlightedSentence
  }

  return (
    <View style={sharedStyle.headerContainer}>
      <Text style={sharedStyle.englishBody} variant="bodyLarge">
        {highlightWord(props.englishSentence, props.englishWord, sharedStyle.englishBody)}
      </Text>
      <Text style={sharedStyle.arabicBody}>
        {highlightWord(props.arabicSentence, props.arabicWord, sharedStyle.arabicBody)}
      </Text>
    </View>
  )
}

WordsContextHighLighted.propTypes = {
  englishWord: PropTypes.string.isRequired,
  englishSentence: PropTypes.string.isRequired,
  arabicWord: PropTypes.string.isRequired,
  arabicSentence: PropTypes.string.isRequired
}

export default WordsContextHighLighted
// function for highlighting a word in a text in a react native component

// import React, { useState } from 'react';
// import { Text, View, StyleSheet } from 'react-native';

// const HighlightWord = ({ text, word }) => {
//   const [highlightedText, setHighlightedText] = useState(text);

//   const highlightWord = (text, word) => {
//     const regex = new RegExp(`(${word})`, 'gi');
//     const newText = text.replace(regex, `<span style="color: red;">$1</span>`);
//     setHighlightedText(() => newText);
//   };

//   React.useEffect(() => {
//     highlightWord(text, word);
//   }, [text, word]);

//   return (
//     <View style={styles.container}>
//       <Text dangerouslySetInnerHTML={{ __html: highlightedText }} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
