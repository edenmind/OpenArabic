import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

const Spinner = () => {
  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 33
    },
    dhikrText: {
      color: theme.colors.secondary,
      fontFamily: 'philosopher',
      fontSize: 18,
      marginTop: 10,
      textAlign: 'center'
    }
  })

  const [randomWord, setRandomWord] = useState('')

  useEffect(() => {
    // eslint-disable-next-line putout/array-element-newline
    const dhikrWords = [
      'SubhanAllah', // سبحان الله - Glory be to Allah
      'Alhamdulillah', // الحمد لله - All praises be to Allah
      'Allahu Akbar', // الله أكبر - Allah is the Greatest
      'La ilaha illallah', // لا إله إلا الله - There is no deity but Allah
      'Astaghfirullah', // أستغفر الله - I seek forgiveness from Allah
      'SubhanAllah wa bihamdihi', // سبحان الله و بحمده - Glory be to Allah and His is the praise
      'SubhanAllah al-Azim', // سبحان الله العظيم - Glory be to Allah, the Most Great
      'Allahumma salli ala Muhammad', // اللهم صل على محمد - O Allah, send blessings on Muhammad
      'Rabbighfirli' // رب اغفر لي - My Lord, forgive me
    ]
    const word = dhikrWords[Math.floor(Math.random() * dhikrWords.length)]

    setRandomWord(word)
  }, [])

  return (
    <View style={styles.container}>
      <ActivityIndicator animating size="large" />
      <Text style={styles.dhikrText}>{randomWord}</Text>
    </View>
  )
}

export default Spinner
