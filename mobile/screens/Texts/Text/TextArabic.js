/* eslint-disable import/namespace */
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import 'react-native-gesture-handler'
import { Paragraph } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner'

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

  const selector = (state) => state.text
  const { text } = useSelector(selector)

  if (text.title) {
    return (
      <ScrollView>
        <Paragraph style={style.arabic}>{text.arabicText}</Paragraph>
      </ScrollView>
    )
  }
  return <Spinner />
}
