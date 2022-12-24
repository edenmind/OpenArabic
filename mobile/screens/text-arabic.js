import 'react-native-gesture-handler'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'

const selector = (state) => ({
  texts: state.texts,
  textsLoading: state.textsLoading
})

export default function TextArabic() {
  const sharedStyle = useSharedStyles()

  const { text, textLoading } = useSelector(selector)
  return textLoading ? (
    <ScrollView style={sharedStyle.container}>
      <Text style={sharedStyle.arabicBody}>{text.texts.arabic}</Text>
    </ScrollView>
  ) : (
    <Spinner />
  )
}
