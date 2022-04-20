/* eslint-disable import/namespace */
import 'react-native-gesture-handler'

import Heading from './Heading'
import React from 'react'
import { ScrollView } from 'react-native'
import Sentences from './Sentences'
import Spinner from '../../../components/Spinner'
import { useSelector } from 'react-redux'

export default function TextBilingual() {
  const selector = (state) => state.text
  const { text } = useSelector(selector)

  return text.title ? (
    <ScrollView>
      <Heading heading={text} />
      <Sentences sentences={text.sentences} />
    </ScrollView>
  ) : (
    <Spinner />
  )
}
