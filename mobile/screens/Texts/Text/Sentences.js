/* eslint-disable import/namespace */
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Paragraph, Text } from 'react-native-paper'
import ModalScrollView from '../../../components/ModalScrollView'
import WordPairs from '../../../components/WordPairs'
import * as util from '../../../services/UtilityService'

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    flex: 1,
    fontSize: 25,
    lineHeight: 35,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 35,
    writingDirection: 'rtl'
  },
  bottomPadding: {
    paddingBottom: 55
  },
  english: {
    direction: 'ltr',
    flex: 1,
    fontSize: 17,
    lineHeight: 25,
    paddingLeft: 15,
    paddingRight: 15,
    writingDirection: 'ltr'
  }
})

export default function Sentences(props) {
  const [visible, setVisible] = React.useState(false)
  const [words, setWords] = React.useState([])
  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)
  const getListOfWordPairs = (index) => setWords(index)

  const modal = (
    <ModalScrollView visible={visible} content={words} hideModal={hideModal} />
  )

  const filterFunction = function (element) {
    return element.english !== '' && element.arabic !== ''
  }

  const sentences = props.sentences.map((sentence) => (
    <Fragment key={sentence.sentenceId}>
      <Paragraph style={style.arabic}>{sentence.arabic}</Paragraph>
      <Paragraph style={style.english}>{sentence.english}</Paragraph>

      <Button
        onPress={() => {
          getListOfWordPairs(
            <WordPairs
              words={util.filterArrayFromEmptyElements(
                sentence.words,
                filterFunction
              )}
            />
          )
          showModal()
        }}>
        <Text>Show Words</Text>
      </Button>
    </Fragment>
  ))

  return (
    <Fragment>
      <View style={style.bottomPadding}>{sentences}</View>
      {modal}
    </Fragment>
  )
}

Sentences.propTypes = {
  sentences: PropTypes.any.isRequired
}
