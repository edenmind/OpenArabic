/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Button, Surface, Text } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import * as Haptics from 'expo-haptics'
import { paperDarkTheme } from '../constants/paper-theme.js'
import { getWords } from '../services/api-service.js'
import { useFocusEffect } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux'
const wordsSelector = (state) => state.words

const App = () => {
  const sharedStyle = useSharedStyles()
  const dispatch = useDispatch()
  const { words } = useSelector(wordsSelector)
  const [currentWord, setCurrentWord] = React.useState(0)

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getWords())
    }, [dispatch])
  )

  return (
    //only show it if there are words
    words.length > 0 && (
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={5}>
          <Text style={styles.arabicText}>{words[currentWord].arabic}</Text>
        </Surface>

        <Button
          mode="elevated"
          style={sharedStyle.button}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
            setCurrentWord(currentWord + 1)
          }}
        >
          <Text style={styles.text}>{words[currentWord + 0].english}</Text>
        </Button>
        <Button mode="elevated" style={sharedStyle.button} onPress={() => {}}>
          <Text style={styles.text}>{words[currentWord + 1].english}</Text>
        </Button>
        <Button mode="elevated" style={sharedStyle.button} onPress={() => {}}>
          <Text style={styles.text}>{words[currentWord + 2].english}</Text>
        </Button>
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
    marginBottom: 30,
    minHeight: 300
  },
  text: {
    color: paperDarkTheme.colors.primary,
    fontSize: 17,
    textAlign: 'center'
  },
  topView: {
    flex: 1
  }
})

export default App
