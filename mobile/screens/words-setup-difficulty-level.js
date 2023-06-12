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
    case '10': {
      source = require('../assets/beginner.jpeg')
      goal = (
        <>
          <Text variant="titleSmall">
            Beginning with an introduction to the three basic types of Arabic words, this phase kick-starts your
            exploration of fundamental Arabic grammar as it applies to Islamic texts.
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
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Past
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Singular
            </Chip>
            <Text variant="labelSmall" style={{ paddingTop: 10 }}>
              Press the label for more information.
            </Text>
          </View>
        </>
      )

      break
    }
    case '20': {
      source = require('../assets/mid-level.jpeg')
      goal = (
        <>
          <Text variant="titleSmall">
            Advancing further, you'll explore Arabic's complexities, now incorporating definite forms and the present
            tense to deepen your grammar knowledge.
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
              Present
            </Chip>

            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Plural
            </Chip>

            <Text variant="labelSmall" style={{ paddingTop: 10 }}>
              Press the label for more information.
            </Text>
          </View>
        </>
      )

      break
    }
    case '30': {
      source = require('../assets/advanced.jpeg')
      goal = (
        <>
          <Text variant="titleSmall">
            In our final stage, we'll dissect Arabic phrases that translate to multiple English words, consolidating
            your ability to engage with basic Islamic texts, In sha'Allah.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
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
              Dual
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Pronoun
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
            >
              Compound
            </Chip>
            <Text variant="labelSmall" style={{ paddingTop: 10 }}>
              Press the label for more information.
            </Text>
          </View>
        </>
      )

      break
    }
    default: {
      return
    }
  }

  return (
    <Surface style={{ borderRadius: 10, minHeight: 350 }} testID="surface">
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
  difficultyLevel: PropTypes.string.isRequired
}
