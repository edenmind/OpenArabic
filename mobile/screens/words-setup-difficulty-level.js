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
    description:
      'Beginning with an introduction to the three types of words, this phase kick-starts your exploration of fundamental Arabic vocabulary as it applies to Islamic texts.',
    image: require('../assets/beginner.jpeg'),
    chips: ['Noun', 'Verb', 'Particle']
  },
  20: {
    description:
      'Advancing further, you will explore Arabics complexities, now incorporating definite forms and the present tense to deepen your vocabulary knowledge.',
    image: require('../assets/mid-level.jpeg'),
    chips: ['Definite', 'Present', 'Plural', 'Pronoun']
  },
  30: {
    description:
      'Advancing further, you will explore Arabics complexities, now incorporating definite forms and the present tense to deepen your vocabulary knowledge.',
    image: require('../assets/advanced.jpeg'),
    chips: ['Future', 'Dual', 'Compound', 'Passive']
  }
}

const grammarFunctionsMap = {
  Noun: getNoun,
  Verb: getVerb,
  Particle: getParticle,
  Definite: getDefinite,
  Present: getPresent,
  Plural: getPlural,
  Pronoun: getPronouns,
  Future: getFuture,
  Dual: getDual,
  Compound: getCompound,
  Passive: getPassive
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
      <Image source={currentConfig.image} style={{ width: '100%', height: 190 }} />
      <View style={{ padding: 10 }}>
        <Divider style={{ ...sharedStyle.divider, opacity: 0 }} />
        <Text variant="bodyMedium">{currentConfig.description}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingTop: 10, paddingBottom: 10 }}>
          {currentConfig.chips?.map((label) => (
            <Chip
              key={label}
              style={{ margin: 3, backgroundColor: theme.colors.tertiary }}
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
