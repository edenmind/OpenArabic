import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native'
import { Modal, Portal, useTheme } from 'react-native-paper'

import { AnswerButton } from '../components/answer-button.js'

const ModalScrollView = ({ content, visible, hideModal, close = 'Close', icon }) => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: theme.colors.background,
      flex: 1,
      height: Dimensions.get('window').height,
      justifyContent: 'space-between',
      width: Dimensions.get('window').width
    }
  })

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
        <ScrollView style={{ flex: 1 }}>
          <View>{content}</View>
        </ScrollView>

        <View>
          <AnswerButton onPress={hideModal} text={close} icon={icon} />
        </View>
      </Modal>
    </Portal>
  )
}

export default ModalScrollView

ModalScrollView.propTypes = {
  close: PropTypes.string,
  content: PropTypes.any.isRequired,
  hideModal: PropTypes.func.isRequired,
  icon: PropTypes.string,
  visible: PropTypes.bool.isRequired
}
