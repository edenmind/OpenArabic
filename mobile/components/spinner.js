/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

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

const Spinner = () => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [randomWord, setRandomWord] = useState('')

  const opacityValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const word = dhikrWords[Math.floor(Math.random() * dhikrWords.length)]
    setRandomWord(word)

    Animated.timing(opacityValue, {
      duration: 1000,
      toValue: 1,
      useNativeDriver: true
    }).start()
  }, [])

  return (
    <Animated.View style={[sharedStyle.spinnerContainer, { opacity: opacityValue }]}>
      <ActivityIndicator animating size="large" />
      <Text style={sharedStyle.dhikrText}>{randomWord}</Text>
    </Animated.View>
  )
}

export default Spinner
