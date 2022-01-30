import React from 'react'
import { Modal, Portal, Text } from 'react-native-paper'
import PropTypes from 'prop-types'

const ModalTexts = (props) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 }

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.hideModal}
        contentContainerStyle={containerStyle}>
        <Text>{props.text}</Text>
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
