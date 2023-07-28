/* eslint-disable no-else-return */
import 'react-native-gesture-handler'
import { Share } from 'react-native'
import { ENDPOINT, HOST } from '../constants/urls.js'
import * as MailComposer from 'expo-mail-composer'
import React from 'react'
import { Text } from 'react-native-paper'
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

// give me a function that capitalizes all letters in a title
export const prepareTitle = (title) => {
  const words = title.trim().split(' ')

  const capitalizedWords = words.map((word) => {
    const firstLetter = word[0].toUpperCase()
    const restOfWord = word.slice(1)

    return `${firstLetter}${restOfWord}`
  })

  return capitalizedWords.join(' ')
}

export function generateTextError(text) {
  async function composeError() {
    await MailComposer.composeAsync({
      recipients: ['salam@edenmind.com'],
      subject: `Found an error in the text: ${text.title}`,
      body: `Please describe the error you found in the text: ${text.id}...`
    })
  }

  return composeError
}

export function generateWordError(text) {
  async function composeError() {
    await MailComposer.composeAsync({
      recipients: ['salam@edenmind.com'],
      subject: `Found an error in the text: ${text.title}`,
      body: `Please describe the error you found in the text: ${text.id}...`
    })
  }

  return composeError
}

export function moonPhaseEmoji(day) {
  if (day < 1 || day > 30) {
    throw new Error('Day must be between 1 and 30.')
  }

  if (day === 1) {
    return '🌑' // New moon
  } else if (day > 1 && day < 7) {
    return '🌒' // Waxing crescent
  } else if (day >= 7 && day < 14) {
    return '🌓' // First quarter
  } else if (day >= 14 && day < 22) {
    return '🌕' // Full moon
  } else if (day >= 22 && day < 29) {
    return '🌗' // Last quarter
  }

  return '🌘' // Waning crescent
}

export function formatGrammar(gram, sharedStyle) {
  if (!gram) {
    return <Text style={sharedStyle.englishHeading}>No explanation available</Text>
  }

  const lines = gram.split('\n')

  return (
    <>
      {lines.map((line, index) => {
        if (line.startsWith('⇉')) {
          return (
            <Text key={index} style={sharedStyle.englishHeading}>
              {`${prepareTitle(line.slice(2))}`}
            </Text>
          )
        }

        if (line.startsWith('⟶')) {
          return (
            <Text key={index} style={{ ...sharedStyle.arabicHeading }}>
              {`${line.slice(2)}`}
            </Text>
          )
        }

        if (line.startsWith('←')) {
          return (
            <Text key={index} style={sharedStyle.arabicHeadingRemove}>
              {`${line.slice(2)}`}
            </Text>
          )
        }

        if (line.startsWith('↠')) {
          return (
            <Text key={index} style={sharedStyle.arabicTerm}>
              {`${line.slice(2)}`}
            </Text>
          )
        }

        return <Text key={index} style={sharedStyle.englishBody}>{`${line}`}</Text>
      })}
    </>
  )
}
