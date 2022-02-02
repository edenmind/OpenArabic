/* eslint-disable import/namespace */
import { StyleSheet, View } from 'react-native'
import { Paragraph, Button, Text } from 'react-native-paper'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ModalTexts from '../../../components/ModalTexts'

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
  const [text, setText] = React.useState('null')
  const hideModal = () => setVisible(false)
  const showModal = () => setVisible(true)
  const handleText = (index) => setText(index)

  const modal = (
    <ModalTexts
      visible={visible}
      text={text}
      hideModal={hideModal}></ModalTexts>
  )
  const sentences = props.sentences.map((sentence) => (
    <Fragment key={sentence.sentenceId}>
      <Paragraph style={style.arabic}>{sentence.arabic}</Paragraph>
      <Paragraph style={style.english}>{sentence.english}</Paragraph>

      <Button
        onPress={() => {
          showModal()
          handleText(sentence.arabic)
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
