import 'react-native-gesture-handler'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, Button, Chip, Divider } from 'react-native-paper'
import React from 'react'
import Spinner from '../components/spinner.js'
import { useSelector } from 'react-redux'
import { useSharedStyles } from '../styles/common.js'
import * as util from '../services/utility-service.js'

const textSelector = (state) => state.text
const textLoadSelector = (state) => state.textLoading

export default function TextArabic() {
  const sharedStyle = useSharedStyles()
  const [englishTranslation, setEnglishTranslation] = React.useState('Tap Arabic Word for Translation...')

  const { text } = useSelector(textSelector)
  const { textLoading } = useSelector(textLoadSelector)
  const styles = StyleSheet.create({
    button: {
      margin: -7
    },
    rowWrapper: {
      direction: 'rtl',
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingBottom: 50,
      readingDirection: 'rtl'
    }
  })

  // loop through all sentences in the text and all the words and return a component that displays the arabic word with each sentence on a new line

  const componentWithArabicWordInATextElementWithEachSentenceOnANewLine = text.sentences.map((sentence) => {
    return sentence.words.map((word, wordIndex) => {
      return (
        <Button
          key={wordIndex}
          mode="text"
          style={styles.button}
          onPress={() => {
            setEnglishTranslation(word.english + ' (' + util.transliterateArabicToEnglish(word.arabic) + ')')
          }}
        >
          <Text style={sharedStyle.arabicBody}>{word.arabic}</Text>
        </Button>
      )
    })
  })

  return textLoading ? (
    <>
      <Chip icon="information" style={{ margin: 10 }}>
        <Text variant="bodyLarge">{englishTranslation}</Text>
      </Chip>
      <Divider style={sharedStyle.divider} />
      <ScrollView style={sharedStyle.scrollView}>
        <View style={styles.rowWrapper}>{componentWithArabicWordInATextElementWithEachSentenceOnANewLine}</View>
      </ScrollView>
    </>
  ) : (
    <Spinner />
  )
}
