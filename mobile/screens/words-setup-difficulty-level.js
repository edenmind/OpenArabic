/* eslint-disable react-native/no-color-literals */
/* eslint-disable unicorn/no-nested-ternary */
import React from 'react'
import { View, Image } from 'react-native'
import { Divider, Surface, Text, useTheme, Chip } from 'react-native-paper'
import { useSharedStyles } from '../styles/common.js'
import PropTypes from 'prop-types'
import ModalScrollView from '../components/modal-scroll-view.js'
import {
  getNoun,
  getVerb,
  getParticle,
  getDefinite,
  getPresent,
  getPlural,
  getPronouns,
  getFuture,
  getDual,
  getPassive,
  getCompound
} from '../services/grammar-service.js'
import { formatGrammar } from '../services/ui-services.js'

const WordsSetupDifficultyLevel = (props) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  let source
  let goal
  const [visible, setVisible] = React.useState(false)
  const hideModal = () => setVisible(false)
  const [title, setTitle] = React.useState('')
  const [explanation, setExplanation] = React.useState('')

  switch (props.difficultyLevel) {
    case 10: {
      source = require('../assets/beginner.jpeg')
      goal = (
        <>
          <Text variant="bodyMedium">
            Beginning with an introduction to the three types of words, this phase kick-starts your exploration of
            fundamental Arabic vocabulary as it applies to Islamic texts.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Noun')
                setExplanation(formatGrammar(getNoun(), sharedStyle))
              }}
            >
              Noun
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Verb')
                setExplanation(formatGrammar(getVerb(), sharedStyle))
              }}
            >
              Verb
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Particle')
                setExplanation(formatGrammar(getParticle(), sharedStyle))
              }}
            >
              Particle
            </Chip>
          </View>
          <Text variant="labelSmall">Press label for explanation</Text>
        </>
      )

      break
    }
    case 20: {
      source = require('../assets/mid-level.jpeg')
      goal = (
        <>
          <Text variant="bodyMedium">
            Advancing further, you will explore Arabic's complexities, now incorporating definite forms and the present
            tense to deepen your vocabulary knowledge.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Definite')
                setExplanation(formatGrammar(getDefinite(), sharedStyle))
              }}
            >
              Definite
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Present')
                setExplanation(formatGrammar(getPresent(), sharedStyle))
              }}
            >
              Present
            </Chip>

            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Plural')
                setExplanation(formatGrammar(getPlural(), sharedStyle))
              }}
            >
              Plural
            </Chip>

            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Pronoun')
                setExplanation(formatGrammar(getPronouns(), sharedStyle))
              }}
            >
              Pronoun
            </Chip>
          </View>
          <Text variant="labelSmall">Press label for explanation</Text>
        </>
      )

      break
    }
    case 30: {
      source = require('../assets/advanced.jpeg')
      goal = (
        <>
          <Text variant="bodyMedium">
            In our final stage, we'll dissect Arabic phrases that translate to multiple English words, consolidating
            your ability to engage with basic Islamic texts, In sha'Allah.
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Future')
                setExplanation(formatGrammar(getFuture(), sharedStyle))
              }}
            >
              Future
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Dual')
                setExplanation(formatGrammar(getDual(), sharedStyle))
              }}
            >
              Dual
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Compound')
                setExplanation(formatGrammar(getCompound(), sharedStyle))
              }}
            >
              Compound
            </Chip>
            <Chip
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => {
                setVisible(true)
                setTitle('Passive')
                setExplanation(formatGrammar(getPassive(), sharedStyle))
              }}
            >
              Passive
            </Chip>
          </View>
          <Text variant="labelSmall">Press label for explanation</Text>
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
      <ModalScrollView
        visible={visible}
        content={<View>{explanation}</View>}
        title={title}
        hideModal={hideModal}
        height="87%"
        titleLanguage="english"
      />
    </Surface>
  )
}

export default WordsSetupDifficultyLevel

WordsSetupDifficultyLevel.propTypes = {
  difficultyLevel: PropTypes.number.isRequired
}
