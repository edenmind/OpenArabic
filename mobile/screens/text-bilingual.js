/* eslint-disable import/namespace */
import 'react-native-gesture-handler'
import Heading from './text-bilingual-heading.js'
import React from 'react'
import { ScrollView } from 'react-native'
import Sentences from './text-bilingual-sentences.js'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'

const selector = (state) => state.text

export default function TextBilingual() {
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
