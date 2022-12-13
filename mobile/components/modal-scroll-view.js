import { Button, Divider, Modal, Portal, Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import { paperDarkTheme } from '../constants/paper-theme.js'

const ModalScrollView = (props) => {
  const containerStyle = {
    margin: 10,
    padding: 10,
    backgroundColor: paperDarkTheme.colors.background,
    maxHeight: '95%',
    borderRadius: 25
  }

  const buttonPadding = {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15
  }

  const titleStyle = {
    alignSelf: 'center',
    padding: 5,
    fontFamily: 'philosopher'
  }

  const dividerStyle = {
    marginTop: 15,
    marginBottom: 15
  }

  const close = 'CLOSE'

  return (
    <Portal>
      <Modal visible={props.visible} onDismiss={props.hideModal} contentContainerStyle={containerStyle}>
        <Text variant="titleLarge" style={titleStyle}>
          {props.title}
        </Text>
        <Divider style={dividerStyle} />
        <ScrollView>{props.content}</ScrollView>
        <Divider />
        <Button onPress={props.hideModal} style={buttonPadding} mode="elevated">
          {close}
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
