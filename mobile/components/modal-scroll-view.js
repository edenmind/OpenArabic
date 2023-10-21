import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Modal, Portal, useTheme, Button } from 'react-native-paper'

const ModalScrollView = ({ content, visible, hideModal }) => {
  const theme = useTheme()

  const styles = StyleSheet.create({
    closeButton: {
      alignSelf: 'flex-start'
    },
    containerStyle: {
      backgroundColor: theme.colors.background,
      height: Dimensions.get('window').height,
      padding: 10,
      paddingTop: 50,
      width: Dimensions.get('window').width
    }
  })

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
        <View style={styles.closeButton}>
          <Button textColor={theme.colors.outline} onPress={hideModal}>
            Close
          </Button>
        </View>

        {content}
      </Modal>
    </Portal>
  )
}

export default ModalScrollView

ModalScrollView.propTypes = {
  content: PropTypes.any.isRequired,
  hideModal: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
}
