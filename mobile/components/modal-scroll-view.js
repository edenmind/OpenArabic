import { Button, Divider, Modal, Portal, Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { paperDarkTheme } from '../constants/paper-theme.js'

const styles = StyleSheet.create({
  buttonPadding: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15
  },

  containerStyle: {
    backgroundColor: paperDarkTheme.colors.background,
    borderRadius: 25,
    margin: 10,
    maxHeight: '95%',
    padding: 10
  },

  dividerStyle: {
    marginBottom: 15,
    marginTop: 15
  },

  titleStyle: {
    alignSelf: 'center',
    fontFamily: 'philosopher',
    padding: 5
  }
})

const ModalScrollView = ({ title, content, visible, hideModal }) => {
  const close = 'CLOSE'

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
        <Text variant="titleLarge" style={styles.titleStyle}>
          {title}
        </Text>
        <Divider style={styles.dividerStyle} />
        <ScrollView>{content}</ScrollView>
        <Divider />
        <Button onPress={hideModal} style={styles.buttonPadding} mode="elevated">
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
