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
    <View key={index} style={{ ...sharedStyle.container, marginTop: 10, marginBottom: 25 }}>
      <Text style={sharedStyle.arabicBody}>{sentence.arabic}</Text>
      {showTransliteration && (
        <Text style={{ ...sharedStyle.englishBody, direction: 'rtl', color: theme.colors.outline }} variant="bodyLarge">
          {util.transliterateArabicToEnglish(sentence.arabic)}
        </Text>
      )}
      <Text style={sharedStyle.englishBody} variant="bodyLarge">
        {sentence.english}
      </Text>
      <PlaySound audioFileNames={sentence.filename} buttonText={UI.playSentence} />
      <Button
        mode="elevated"
        textColor={theme.colors.tertiary}
        icon="eye-outline"
        onPress={() => {
          getListOfWordPairs(<WordPairs words={util.filterArrayFromEmptyElements(sentence.words, filterFunction)} />)
          showModal()
          setTitle('Words')
        }}
      >
        {UI.explainWords}
      </Button>
    </View>
  ))

  return (
    <>
      {sentences}
      <ModalScrollView visible={visible} content={words} title={title} hideModal={hideModal} titleLanguage="english" />
    </>
  )
}

TextBilingualSentences.propTypes = {
  sentences: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string
    })
  ).isRequired
}
export default React.memo(TextBilingualSentences)
