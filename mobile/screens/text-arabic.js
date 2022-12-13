import 'react-native-gesture-handler'
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextArabic() {
  const sharedStyle = useSharedStyles()

  const { text } = useSelector(textSelector)
  const { textLoading } = useSelector(textLoadSelector)

  return textLoading ? (
    <ScrollView style={sharedStyle.container}>
      <Text style={sharedStyle.arabicBody}>{text.texts.arabic}</Text>
    </ScrollView>
  ) : (
    <Spinner />
  )
}
