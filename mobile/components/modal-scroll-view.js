import { Button, Modal, Portal, Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'

const ModalScrollView = (props) => {
  const containerStyle = {
    margin: 20,
    padding: 20,
    backgroundColor: 'rgb(49, 49, 43)',
    height: '85%',
    borderRadius: 10
  }

  const buttonPadding = {
    paddingTop: 30,
    paddingLeft: 100,
    paddingRight: 100
  }

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
        <Text variant="titleMedium">{props.title}</Text>
        <ScrollView>{props.content}</ScrollView>
        <Button onPress={props.hideModal} style={buttonPadding} mode="text">
          <Text variant="labelMedium">Close</Text>
        </Button>
      </Modal>
    </Portal>
  )
}

export default ModalScrollView

ModalScrollView.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
}
