import 'react-native-gesture-handler'
import { ScrollView, StyleSheet } from 'react-native'
import { Paragraph } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'

const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextArabic() {
  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      flex: 1,
      fontSize: 25,
      lineHeight: 45,
      padding: 25,
      writingDirection: 'rtl'
    }
  })

  const { text } = useSelector(textSelector)
  const { textLoading } = useSelector(textLoadSelector)

  return textLoading ? (
    <ScrollView>
      <Paragraph style={style.arabic}>{text.texts.arabic}</Paragraph>
    </ScrollView>
  ) : (
    <Spinner />
  )
}
