import 'react-native-gesture-handler'
import { Share } from 'react-native'
import { ENDPOINT, HOST } from '../constants/urls.js'
import * as MailComposer from 'expo-mail-composer'
import React from 'react'
import { Text } from 'react-native-paper'
import { paperDarkTheme } from '../constants/paper-theme.js'

export function generateShare(text) {
  async function shareText() {
    await Share.share({
      message: `🔗 ${text.title} - ${text.author}`,
      title: `🔗 ${text.title} - ${text.author}`,
      url: `${HOST.frontend}/${ENDPOINT.texts}/${text.slug}`
    })
  }

  return shareText
}

export function generateError(text) {
  async function composeError() {
    await MailComposer.composeAsync({
      recipients: ['salam@edenmin.com'],
      subject: `Found an error in the text: ${text.title}`,
      body: `Please describe the error you found in the text: ${text.id}...`
    })
  }

  return composeError
}

export function formatGrammar(gram, sharedStyle) {
  if (!gram) {
    return 'No explanation available'
  }

  const lines = gram.split('\n')

  return (
    <>
      {lines.map((line, index) => {
        if (line.startsWith('⟶')) {
          return (
            <Text key={index} variant="titleMedium" style={{ color: paperDarkTheme.colors.onBackground }}>
              {`${line.slice(2)}\n`}
            </Text>
          )
        }

        if (line.startsWith('←')) {
          return (
            <Text key={index} style={sharedStyle.arabicHeading}>
              {`\n${line.slice(2)}\n`}
            </Text>
          )
        }

        return <Text key={index} style={sharedStyle.englishBody}>{`${line}\n`}</Text>
      })}
    </>
  )
}
