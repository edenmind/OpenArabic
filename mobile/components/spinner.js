import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'

const dhikrWords = [
  'SubhanAllah',
  'Alhamdulillah',
  'Allahu Akbar',
  'La ilaha illallah',
  'Astaghfirullah',
  'SubhanAllah wa bihamdihi',
  'SubhanAllah al-Azim',
  'Allahumma salli ala Muhammad',
  'Rabbighfirli'
]

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 33
  },
  dhikrText: {
    fontFamily: 'philosopher',
    fontSize: 18,
    marginTop: 33,
    textAlign: 'center'
  }
})

const Spinner = () => {
  const theme = useTheme()
  const [randomWord, setRandomWord] = useState('')

  useEffect(() => {
    const word = dhikrWords[Math.floor(Math.random() * dhikrWords.length)]
    setRandomWord(word)
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator animating size="large" />
      <Text style={{ ...styles.dhikrText, color: theme.colors.secondary }}>{randomWord}</Text>
    </View>
  )
}

export default Spinner
