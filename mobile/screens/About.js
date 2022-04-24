/* eslint-disable import/namespace */
/* eslint-disable react-native/no-raw-text */
import 'react-native-gesture-handler'

import { Button, Paragraph, Title } from 'react-native-paper'
import { Linking, ScrollView, StyleSheet } from 'react-native'

import React from 'react'

function About() {
  const style = StyleSheet.create({
    english: {
      direction: 'ltr',
      flex: 1,
      lineHeight: 20,
      padding: 10,
      writingDirection: 'ltr'
    },
    button: {
      margin: 30,
      marginBottom: 50
    }
  })

  const contactUrl =
    'mailto:salam@edenmind.com?subject=Mail from OpenArabic&body=Enter your question...'

  return (
    <ScrollView style={style.english}>
      <Title style={style.english}>Audience</Title>
      <Paragraph style={style.english}>
        If you know some Arabic and strive to switch from reading Islamic texts in English to read
        in Arabic; then OpenArabic is a reading platform — featuring short bilingual texts and
        vocabulary quizzes — that will help you in that process, inshāʾAllāh.
      </Paragraph>
      <Paragraph style={style.english}>
        OpenArabic does not teach the Arabic alphabet nor Arabic grammar. If you need a resource to
        get you started, then the Duolingo app available on iPhone and Android might come in handy.
      </Paragraph>
      <Title style={style.english}>Foundation</Title>
      <Paragraph style={style.english}>
        The theological foundation of OpenArabic is based upon the Qurʼān, the Prophetic Sunnah and
        the first generations of Muslims understanding with texts from Islamic Scholars such as:
      </Paragraph>
      <Title style={style.english}>Open Source</Title>
      <Paragraph style={style.english}>
        The platform that OpenArabic runs upon is built using Open Source tools such as Angular,
        .NET, and Kubernetes. If you are interested in helping out with the development, then please
        check out the OpenArabic project on GitHub.
      </Paragraph>

      <Button
        style={style.button}
        icon="mail"
        mode="contained"
        testID="contactButton"
        onPress={() => Linking.openURL(contactUrl)}>
        Contact us
      </Button>
    </ScrollView>
  )
}

export default About
