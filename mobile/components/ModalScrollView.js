import { Button, Modal, Portal, Text, Title } from 'react-native-paper'

import COLORS  from '../constants/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const ModalScrollView = (props) => {
  const containerStyle = {
    backgroundColor: COLORS.shinyOlive,
    margin: 20,
    padding: 20
  }

  const buttonPadding = {
    paddingTop: 30,
    paddingLeft: 100,
    paddingRight: 100
  }

  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.hideModal}
        contentContainerStyle={containerStyle}>
        <Title>{props.title}</Title>
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
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
}
