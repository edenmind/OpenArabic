import { Button, Divider, Modal, Portal, Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import * as Haptics from 'expo-haptics'
import { useSharedStyles } from '../styles/common.js'
// eslint-disable-next-line putout/destructuring-as-function-argument
const ModalScrollView = ({
  title,
  content,
  visible,
  hideModal,
  height = '85%',
  close = 'CLOSE',
  titleLanguage = 'arabic',
  icon
}) => {
  const theme = useTheme()
  const sharedStyled = useSharedStyles(theme)
  const styles = StyleSheet.create({
    buttonPadding: {
      marginBottom: 15,
      marginLeft: 25,
      marginRight: 25,
      marginTop: 15
    },

    containerStyle: {
      backgroundColor: theme.colors.background,
      borderRadius: 15,
      height,
      margin: 10,
      padding: 10
    },

    titleStyle: {
      ...sharedStyled.arabicHeading,
      alignSelf: 'center',
      marginHorizontal: 33,
      textAlign: 'center',
      writingDirection: 'rtl'
    },
    titleStyleEnglish: {
      alignSelf: 'center',
      fontFamily: 'philosopher',
      fontSize: 25,
      marginHorizontal: 25,
      marginVertical: 15,
      textAlign: 'center'
    }
  })

  //a function that triggers a haptic feedback and then runs hideModal
  const hideModalWithHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    hideModal()
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
        {title && (
          <>
            <Text style={titleLanguage === 'english' ? styles.titleStyleEnglish : styles.titleStyle}>{title}</Text>
            <Divider />
          </>
        )}
        <ScrollView>{content}</ScrollView>
        <Divider />
        <Button onPress={hideModalWithHaptic} style={styles.buttonPadding} mode="elevated" icon={icon}>
          {close}
        </Button>
      </Modal>
    </Portal>
  )
}

export default ModalScrollView

ModalScrollView.propTypes = {
  title: PropTypes.string.isRequired,
  titleLanguage: PropTypes.string,
  content: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  height: PropTypes.string,
  close: PropTypes.string,
  icon: PropTypes.string
}
