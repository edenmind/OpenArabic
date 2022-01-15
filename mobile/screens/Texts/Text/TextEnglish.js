/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Paragraph } from 'react-native-paper'
import { useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner'
export default function TextEnglish() {
  const style = StyleSheet.create({
    english: {
      direction: 'ltr',
      flex: 1,
      fontSize: 17,
      lineHeight: 27,
      padding: 25,
      writingDirection: 'ltr'
    }
  })

  const selector = (state) => state.text
  const { text } = useSelector(selector)

  // const navigation = useNavigation();
  // navigation.setOptions({ webTitle: text.title });

  if (text.title) {
    return (
      <ScrollView>
        <Paragraph style={style.english}>{text.englishText}</Paragraph>
      </ScrollView>
    )
  }
  return <Spinner />
}
