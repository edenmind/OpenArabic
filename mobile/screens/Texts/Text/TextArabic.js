import 'react-native-gesture-handler'

/* eslint-disable import/namespace */
import { ScrollView, StyleSheet } from 'react-native'

import { Paragraph } from 'react-native-paper'
import React from 'react'
import Spinner from '../../../components/Spinner'
import { useSelector } from 'react-redux'

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
        <Paragraph style={style.arabic}>{text.texts.arabic}</Paragraph>
      </ScrollView>
    )
  }
  return <Spinner />
}
