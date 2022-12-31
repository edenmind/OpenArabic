/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import { getWords } from '../services/api-service.js'
import { useDispatch, useSelector } from 'react-redux'
import * as util from '../services/utility-service.js'
const wordsSelector = (state) => state.words

const Words = () => {
  const sharedStyle = useSharedStyles()
  const dispatch = useDispatch()
  const { words } = useSelector(wordsSelector)
  const [currentWord, setCurrentWord] = React.useState(1)

  React.useEffect(() => {
    dispatch(getWords())
  }, [dispatch])

  const button1 = (
    <Button
      mode="elevated"
      style={sharedStyle.button}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        setCurrentWord(currentWord + 1)
      }}
    >
      <Text style={styles.text}>{words[currentWord].english}</Text>
    </Button>
  )

  const button2 = (
    <Button mode="elevated" style={sharedStyle.button} onPress={() => {}}>
      <Text style={styles.text}>{words[currentWord].alternative1}</Text>
    </Button>
  )
  const button3 = (
    <Button mode="elevated" style={sharedStyle.button} onPress={() => {}}>
      <Text style={styles.text}>{words[currentWord].alternative2}</Text>
    </Button>
  )

  //randomize the order of the buttons
  const buttons = [button1, button2, button3].sort(() => Math.random() - 0.5)

  return (
    //only show it if there are words
    words.length > 0 && (
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={2}>
          <Text style={styles.arabicText}>{words[currentWord].arabic}</Text>
          <Text style={styles.transliterationText} variant="bodyLarge">
            {util.transliterateArabicToEnglish(words[currentWord].arabic)}
          </Text>
        </Surface>
        {buttons.map((button, index) => (
          <View key={index}>{button}</View>
        ))}
      </View>
    )
  )
}

const styles = StyleSheet.create({
  arabicText: {
    color: paperDarkTheme.colors.secondary,
    fontFamily: 'uthman',
    fontSize: 75
  },
  container: {
    flex: 1,
    margin: 10
  },
  surface: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    minHeight: 300
  },
  text: {
    color: paperDarkTheme.colors.primary,
    fontSize: 17,
    textAlign: 'center'
  },
  topView: {
    flex: 1
  },
  transliterationText: {
    color: paperDarkTheme.colors.secondary
  }
})

export default Words
