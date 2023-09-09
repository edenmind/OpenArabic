/* eslint-disable no-else-return */
import 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'
import React from 'react'
import { Share } from 'react-native'
import { Text } from 'react-native-paper'

import { ENDPOINT, HOST } from '../constants/urls.js'
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

export const calculateFontSize = (arabic) => {
  return arabic?.trim().length > 15 ? 95 : 120
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
      body: `Please describe the error you found in the text: ${text.id}...`,
      recipients: ['salam@edenmind.com'],
      subject: `Found an error in the text: ${text.title}`
    })
  }

  return composeError
}

export function generateWordError(text) {
  async function composeError() {
    await MailComposer.composeAsync({
      body: `Please describe the error you found in the text: ${text.id}...`,
      recipients: ['salam@edenmind.com'],
      subject: `Found an error in the text: ${text.title}`
    })
  }

  return composeError
}

export function moonPhaseEmoji(day) {
  const dayInt = Number.parseInt(day, 10)

  if (dayInt < 1 || dayInt > 30) {
    throw new Error('Day must be between 1 and 30.')
  }

  if (dayInt === 1) {
    return '🌑' // New moon
  } else if (dayInt > 1 && dayInt < 7) {
    return '🌒' // Waxing crescent
  } else if (dayInt >= 7 && dayInt < 14) {
    return '🌓' // First quarter
  } else if (dayInt >= 14 && dayInt < 22) {
    return '🌕' // Full moon
  } else if (dayInt >= 22 && dayInt < 29) {
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
