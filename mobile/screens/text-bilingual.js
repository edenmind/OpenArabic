import 'react-native-gesture-handler'
import Heading from './text-bilingual-heading.js'
import React from 'react'
import { ScrollView, Share } from 'react-native'
import Sentences from './text-bilingual-sentences.js'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { Button } from 'react-native-paper'
import { ENDPOINT, HOST } from '../constants/urls.js'
import * as MailComposer from 'expo-mail-composer'
import { useSharedStyles } from '../styles/common.js'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextBilingual() {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)
  const share = 'SHARE'
  const report = 'REPORT ERROR'
  const sharedStyle = useSharedStyles()

  const onShare = async () => {
    await Share.share({
      message: `🔗 ${text.title} - ${text.author}`,
      title: `🔗 ${text.title} - ${text.author}`,
      url: `${HOST.frontend}/${ENDPOINT.texts}/${text.slug}`
    })
  }

  const onErrorReport = async () => {
    MailComposer.composeAsync({
      recipients: ['salam@edenmin.com'],
      subject: `Found an error in the text: ${text.title}`,
      body: `Please describe the error you found in the text: ${text.id}...`
    })
  }

  return textLoading ? getContent() : <Spinner />

  function getContent() {
    return (
      <ScrollView>
        <Heading heading={text} />
        <Sentences sentences={text.sentences} />
        <Button style={sharedStyle.button} mode="contained" onPress={onShare}>
          {share}
        </Button>
        <Button style={sharedStyle.button} mode="outlined" onPress={onErrorReport}>
          {report}
        </Button>
      </ScrollView>
    )
  }
}
