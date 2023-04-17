import * as util from '../services/utility-service.js'
import { Button, Text } from 'react-native-paper'
import React from 'react'
import { View } from 'react-native'
import ModalScrollView from '../components/modal-scroll-view.js'
import PropTypes from 'prop-types'
import WordPairs from './text-bilingual-sentences-word-pairs-list.js'
import { useSelector } from 'react-redux'
import PlaySound from '../components/play-sound.js'
import { useSharedStyles } from '../styles/common.js'

const filterFunction = (element) => element.english && element.arabic
const isTransliterationOnSelector = (state) => state.isTransliterationOn

function TextBilingualSentences(props) {
  const { isTransliterationOn } = useSelector(isTransliterationOnSelector)
  const sharedStyle = useSharedStyles()

  //if isTransliterationOn is a string with value on then set showTransliteration to true
  const showTransliteration = isTransliterationOn === 'on'
  const [visible, setVisible] = React.useState(false)
  const [words, setWords] = React.useState([])
  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)

  const getListOfWordPairs = React.useCallback((index) => setWords(index), [])
  const showWords = 'EXPLAIN WORDS'

  const sentences = props.sentences.map((sentence, index) => (
    <View key={index} style={sharedStyle.container}>
      <Text style={sharedStyle.arabicBody}>{sentence.arabic}</Text>
      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody }} variant="bodyLarge">
          {util.transliterateArabicToEnglish(sentence.arabic)}
        </Text>
      )}
      <Text style={sharedStyle.englishBody} variant="bodyLarge">
        {sentence.english}
      </Text>
      <PlaySound audioFileName={sentence.filename} buttonText={'PLAY SENTENCE'} />
      <Button
        mode="elevated"
        onPress={() => {
          getListOfWordPairs(<WordPairs words={util.filterArrayFromEmptyElements(sentence.words, filterFunction)} />)
          showModal()
        }}
      >
        {showWords}
      </Button>
    </View>
  ))

  return (
    <>
      {sentences}
      <ModalScrollView visible={visible} content={words} title={'Explanations'} hideModal={hideModal} />
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
