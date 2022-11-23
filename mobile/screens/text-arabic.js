import 'react-native-gesture-handler'
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
const arabicSelector = (state) => state.arabicFontSize
const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextArabic() {
  const { arabicFontSize } = useSelector(arabicSelector)

  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      fontFamily: 'uthmanic',
      fontSize: arabicFontSize,
      lineHeight: 60,
      padding: 25,
      writingDirection: 'rtl'
    }
  })

  const { text } = useSelector(textSelector)
  const { textLoading } = useSelector(textLoadSelector)

  return textLoading ? (
    <ScrollView>
      <Text style={style.arabic}>{text.texts.arabic}</Text>
    </ScrollView>
  ) : (
    <Spinner />
  )
}
