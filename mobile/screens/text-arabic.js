import 'react-native-gesture-handler'
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
const arabicSelector = (state) => state.arabicFontSize
const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading
const arabicFontNameSelector = (state) => state.arabicFontName

export default function TextArabic() {
  const { arabicFontSize } = useSelector(arabicSelector)
  const { arabicFontName } = useSelector(arabicFontNameSelector)

  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      fontFamily: arabicFontName,
      fontSize: arabicFontSize,
      lineHeight: 70,
      padding: 25,
      paddingBottom: 50,
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
