import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { Divider, Surface, Text, useTheme, Chip } from 'react-native-paper'

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
import { useSharedStyles } from '../styles/common.js'

const difficultyConfig = {
  10: {
    chips: ['Noun', 'Verb', 'Particle'],
    description:
      'Beginning with an introduction to the three types of words, this phase kick-starts your exploration of fundamental Arabic vocabulary as it applies to Islamic texts.',
    image: require('../assets/beginner.jpeg')
  },
  20: {
    chips: ['Definite', 'Present', 'Plural', 'Pronoun'],
    description:
      'Advancing further, you will explore Arabics complexities, now incorporating definite forms and the present tense to deepen your vocabulary knowledge.',
    image: require('../assets/mid-level.jpeg')
  },
  30: {
    chips: ['Future', 'Dual', 'Compound', 'Passive'],
    description:
      'Advancing further, you will explore Arabics complexities, now incorporating definite forms and the present tense to deepen your vocabulary knowledge.',
    image: require('../assets/advanced.jpeg')
  }
}

const grammarFunctionsMap = {
  Compound: getCompound,
  Definite: getDefinite,
  Dual: getDual,
  Future: getFuture,
  Noun: getNoun,
  Particle: getParticle,
  Passive: getPassive,
  Plural: getPlural,
  Present: getPresent,
  Pronoun: getPronouns,
  Verb: getVerb
}

const WordsSetupDifficultyLevel = ({ difficultyLevel }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [explanation, setExplanation] = useState('')

  const handleChipPress = (label) => {
    setVisible(true)
    setTitle(label)
    setExplanation(formatGrammar(grammarFunctionsMap[label](), sharedStyle))
  }

  const currentConfig = difficultyConfig[difficultyLevel] || {}

  return (
    <Surface style={{ borderRadius: 10, minHeight: 350 }} testID="surface">
      <Image source={currentConfig.image} style={{ height: 190, width: '100%' }} />
      <View style={{ padding: 10 }}>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        <Text variant="bodyMedium">{currentConfig.description}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, paddingTop: 10 }}>
          {currentConfig.chips?.map((label) => (
            <Chip
              key={label}
              style={{ backgroundColor: theme.colors.tertiary, margin: 3 }}
              compact={true}
              selectedColor={theme.colors.onTertiary}
              onPress={() => handleChipPress(label)}
            >
              {label}
            </Chip>
          ))}
        </View>
      </View>
      <ModalScrollView
        visible={visible}
        content={<View>{explanation}</View>}
        title={title}
        hideModal={() => setVisible(false)}
        height="87%"
        titleLanguage="english"
      />
    </Surface>
  )
}

WordsSetupDifficultyLevel.propTypes = {
  difficultyLevel: PropTypes.number.isRequired
}

export default WordsSetupDifficultyLevel
