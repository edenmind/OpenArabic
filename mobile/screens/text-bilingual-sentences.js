import * as util from '../services/utility-service.js'
import { Button, Text, useTheme } from 'react-native-paper'
import React from 'react'
import { View } from 'react-native'
import ModalScrollView from '../components/modal-scroll-view.js'
import PropTypes from 'prop-types'
import WordPairs from './text-bilingual-sentences-word-pairs-list.js'
import { useSelector } from 'react-redux'
import PlaySound from '../components/play-sound.js'
import { useSharedStyles } from '../styles/common.js'
import UI from '../constants/ui.js'
import { formatGrammar } from '../services/ui-services.js'

const filterFunction = (element) => element.english && element.arabic
const isTransliterationOnSelector = (state) => state.isTransliterationOn

function TextBilingualSentences(props) {
  const theme = useTheme()
  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const sharedStyle = useSharedStyles(theme)

  //if isTransliterationOn is a string with value on then set showTransliteration to true
  const showTransliteration = isTransliterationOn === 'on'
  const [visible, setVisible] = React.useState(false)
  const [words, setWords] = React.useState([])
  const [title, setTitle] = React.useState('')

  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)

  const getListOfWordPairs = React.useCallback((index) => setWords(index), [])
  const sentences = props.sentences.map((sentence, index) => (
    <View key={index} style={{ ...sharedStyle.container, marginTop: 25, marginBottom: 25 }}>
      <Text style={sharedStyle.arabicBody}>{sentence.arabic}</Text>
      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody, direction: 'rtl' }} variant="bodyLarge">
          {util.transliterateArabicToEnglish(sentence.arabic)}
        </Text>
      )}
      <Text style={sharedStyle.englishBody} variant="bodyLarge">
        {sentence.english}
      </Text>
      <PlaySound audioFileName={sentence.filename} buttonText={UI.playSentence} />
      <Button
        mode="elevated"
        textColor={theme.colors.tertiary}
        icon="card-text-outline"
        onPress={() => {
          setWords(formatGrammar(sentence.explanation, sharedStyle))
          setTitle(sentence.arabic)
          showModal()
        }}
      >
        STUDY SENTENCE
      </Button>
      <Button
        mode="elevated"
        textColor={theme.colors.tertiary}
        style={{ marginTop: 10 }}
        icon="abjad-arabic"
        onPress={() => {
          getListOfWordPairs(<WordPairs words={util.filterArrayFromEmptyElements(sentence.words, filterFunction)} />)
          showModal()
          setTitle('')
        }}
      >
        STUDY WORDS
      </Button>
    </View>
  ))

  return (
    <>
      {sentences}
      <ModalScrollView visible={visible} content={words} title={title} hideModal={hideModal} />
    </>
  )
}

TextBilingualSentences.propTypes = {
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string
    })
  ).isRequired // Add validation
}
export default React.memo(TextBilingualSentences)
