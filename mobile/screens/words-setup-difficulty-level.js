/* eslint-disable react-native/no-color-literals */
/* eslint-disable unicorn/no-nested-ternary */
import React from 'react'
import { View, Image } from 'react-native'
import { Divider, Surface, Text, useTheme, Chip } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'

const WordsSetupDifficultyLevel = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  let source
  let goal

  switch (props.difficultyLevel) {
    case 10: {
      source = require('../assets/beginner.jpeg')
      goal = (
        <>
          <Text variant="titleSmall">
            In this introductory level, we will explore the three types of words that shape the Arabic language.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Noun
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Verb
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Particle
            </Chip>
          </View>
          <Text variant="labelSmall">Press the labels for explanations</Text>
        </>
      )

      break
    }
    case 20: {
      source = require('../assets/mid-level.jpeg')
      goal = (
        <>
          <Text variant="titleSmall">
            Building upon the beginner level, we will now introduce new forms of nouns and verbs.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Definite
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Indefinite
            </Chip>

            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Plural
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Pronoun
            </Chip>
          </View>
          <Text variant="labelSmall">Press the labels for explanations</Text>
        </>
      )

      break
    }
    case 30: {
      //Not in use yet.
      source = require('../assets/advanced.jpeg')
      goal = (
        <>
          <Text variant="titleSmall">
            You will now encounter more advanced vocabulary accompanied by attached particles and pronouns.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Passive
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Future
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Possessive
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Person
            </Chip>
          </View>
          <Text variant="labelSmall">Press the labels for explanations</Text>
        </>
      )

      break
    }
    default: {
      return
    }
  }

  return (
    <Surface style={{ borderRadius: 10, minHeight: 350 }}>
      <Image source={source} style={{ width: '100%', height: 190 }} />
      <View style={{ padding: 10 }}>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        {goal}
      </View>
    </Surface>
  )
}

export default WordsSetupDifficultyLevel

WordsSetupDifficultyLevel.propTypes = {
  difficultyLevel: PropTypes.number.isRequired
}
