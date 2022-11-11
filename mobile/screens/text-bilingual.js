import 'react-native-gesture-handler'
import Heading from './text-bilingual-heading.js'
import React from 'react'
import { ScrollView, StyleSheet, Share } from 'react-native'
import Sentences from './text-bilingual-sentences.js'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { Button, Divider, Text } from 'react-native-paper'
import { ENDPOINT, HOST } from '../constants/urls.js'
import * as MailComposer from 'expo-mail-composer'

const selector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextBilingual() {
  const { text } = useSelector(selector)
  const { textLoading } = useSelector(textLoadSelector)

  const style = StyleSheet.create({
    button: {
      marginLeft: 25,
      marginRight: 25,
      marginTop: 15
    },
    divider: {
      marginBottom: 150
    }
  })

  const onShare = async () => {
    try {
      await Share.share({
        title: `${text.title} - ${text.author}`,
        url: `${HOST.frontend}/${ENDPOINT.texts}/${text.slug}`
      })
    } catch (error) {
      alert(error.message)
    }
  }

  const onErrorReport = async () => {
    try {
      MailComposer.composeAsync({
        recipients: ['salam@edenmin.com'],
        subject: `Found an error in the text: ${text.title}`,
        body: `Please describe the error you found in the text: ${text.id}...`
      })
    } catch (error) {
      alert(error.message)
    }
  }

  return textLoading ? (
    <ScrollView>
      <Heading heading={text} />
      <Sentences sentences={text.sentences} />
      <Button style={style.button} mode="outlined" onPress={onShare}>
        <Text>Share</Text>
      </Button>
      <Button style={style.button} mode="outlined" onPress={onErrorReport}>
        <Text>Report an Error</Text>
      </Button>
      <Divider style={style.divider} />
    </ScrollView>
  ) : (
    <Spinner />
  )
}
