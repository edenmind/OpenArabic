import React from 'react'
import { Modal, Portal, Text, Button } from 'react-native-paper'
import PropTypes from 'prop-types'
import { COLORS } from '../constants/colors'

const ModalTexts = (props) => {
  const containerStyle = {
    backgroundColor: COLORS.shinyOlive,
    margin: 20,
    padding: 20
  }

  const buttonPadding = {
    paddingTop: 30
  }

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.hideModal}
        contentContainerStyle={containerStyle}>
        <Text>{props.text}</Text>
        <Text>{props.text}</Text>
        <Text>{props.text}</Text>
        <Button onPress={props.hideModal} style={buttonPadding}>
          <Text>Close</Text>
        </Button>
      </Modal>
    </Portal>
  )
}

export default ModalTexts

ModalTexts.propTypes = {
  text: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
}
