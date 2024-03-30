/* eslint-disable no-else-return */
import 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'
import React from 'react'
import { Text } from 'react-native-paper'

export const calculateFontSize = (arabic) => {
  return arabic?.trim().length > 15 ? 95 : 120
}

export const pluralize = (number, word) => {
  return number === 1 ? `${number} ${word}` : `${number} ${word}s`
}

export function getAdaptiveFontSize(word) {
  const minFontSize = 13
  const maxFontSize = 15
  const minWordLength = 5
  const maxWordLength = 10

  const computeFontSize = (wordLength) => {
    if (wordLength <= minWordLength) return maxFontSize
    if (wordLength >= maxWordLength) return minFontSize

    // Interpolate the font size
    const proportion = (wordLength - minWordLength) / (maxWordLength - minWordLength)
    return maxFontSize - proportion * (maxFontSize - minFontSize)
  }

  return computeFontSize(word.length)
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
          const baseStyle = { ...sharedStyle.arabicHeading }
          const textStyle = line.length > 15 ? { ...baseStyle, paddingLeft: 15, textAlign: 'left' } : baseStyle

          return (
            <Text key={index} style={textStyle}>
              {`${line.slice(2)}`}
            </Text>
          )
        }

        if (line.startsWith('←')) {
          return (
            <Text key={index} style={{ ...sharedStyle.arabicHeadingRemove }}>
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

        return <Text key={index} variant="bodyLarge" style={{ ...sharedStyle.grammarText }}>{`${line}`}</Text>
      })}
    </>
  )
}
