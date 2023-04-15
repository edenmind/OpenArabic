/* eslint-disable react/prop-types */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import { Divider, Text, Button } from 'react-native-paper'
import * as util from '../services/utility-service.js'
import PlaySound from '../components/play-sound.js'
import { useSharedStyles } from '../styles/common.js'
import ModalScrollView from '../components/modal-scroll-view.js'

const EXPLAIN = 'EXPLAIN'

const styles = StyleSheet.create({
  arabic: {
    fontFamily: 'uthman',
    fontSize: 35,
    opacity: 1
  },
  divider: {
    margin: 10,
    opacity: 0.3
  },
  flexOne: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})

function TextBilingualSentencesWords({ word }) {
  const sharedStyle = useSharedStyles()
  const [visible, setVisible] = React.useState(false)
  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)

  function formatGrammar(gram) {
    if (!gram) {
      return 'No explanation available'
    }

    const lines = gram.split('\n')

    return (
      <>
        {lines.map((line, index) => {
          if (line.startsWith('⟶')) {
            return (
              <Text key={index} variant="titleMedium">
                {`${line.slice(2)}\n`}
              </Text>
            )
          }

          return (
            <Text key={index} style={{ ...sharedStyle.englishBody, fontSize: 19, lineHeight: 29 }}>{`${line}\n`}</Text>
          )
        })}
      </>
    )
  }

  const explanation = (
    <View style={{ padding: 10 }}>
      <Text style={{ ...sharedStyle.englishBody, fontSize: 19, lineHeight: 29 }}>{formatGrammar(word.grammar)}</Text>
    </View>
  )

  return (
    <Fragment>
      <View style={styles.row}>
        <View style={styles.flexOne}>
          <Text style={styles.arabic}>{word.arabic}</Text>
          <Text style={{ ...sharedStyle.englishBody, opacity: 1 }}>
            {word.english.charAt(0).toUpperCase() + word.english.slice(1)} ·{' '}
            {util.transliterateArabicToEnglish(word.arabic)}
          </Text>
        </View>
        <View style={styles.flexOne}>
          <PlaySound audioFileName={word.filename} buttonText={'PLAY'} />
          <Button mode="elevated" onPress={showModal}>
            {EXPLAIN}
          </Button>
        </View>
      </View>
      <ModalScrollView
        visible={visible}
        content={<Text>{explanation}</Text>}
        title={word.arabic}
        hideModal={hideModal}
        height="60%"
      />
      <Divider style={styles.divider} />
    </Fragment>
  )
}

TextBilingualSentencesWords.propTypes = {
  word: PropTypes.shape({
    arabic: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    grammar: PropTypes.string
  }).isRequired
}

export default TextBilingualSentencesWords
