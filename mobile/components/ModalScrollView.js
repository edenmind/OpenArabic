import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Modal, Portal, Text } from 'react-native-paper'
import { COLORS } from '../constants/colors'

const ModalScrollView = (props) => {
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
        <ScrollView>{props.content}</ScrollView>
        <Button onPress={props.hideModal} style={buttonPadding}>
          <Text>Close</Text>
        </Button>
      </Modal>
    </Portal>
  )
}

export default ModalScrollView

ModalScrollView.propTypes = {
  content: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
}
