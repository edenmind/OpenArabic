import { Button, Divider, Modal, Portal, Text, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSharedStyles } from '../styles/common.js'
import { AnswerButton } from '../components/answer-button.js'

// eslint-disable-next-line putout/destructuring-as-function-argument
const ModalScrollView = ({
  title,
  content,
  visible,
  hideModal,
  height = '93%',
  close = 'Close',
  titleLanguage = 'arabic',
  icon
}) => {
  const theme = useTheme()
  const sharedStyled = useSharedStyles(theme)
  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: theme.colors.background,
      borderRadius: 15,
      height,
      margin: 10,
      padding: 5
    },
    titleStyle: {
      ...sharedStyled.arabicHeading,
      alignSelf: 'center',
      marginHorizontal: 10,
      paddingBottom: 15,
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

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
        {title && (
          <>
            <Text style={titleLanguage === 'english' ? styles.titleStyleEnglish : styles.titleStyle}>{title}</Text>

            <Divider />
          </>
        )}
        <ScrollView>
          <View style={{ marginHorizontal: 5, paddingHorizontal: 5 }}>{content}</View>
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
  title: PropTypes.string.isRequired,
  titleLanguage: PropTypes.string,
  content: PropTypes.any.isRequired,
  visible: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
  height: PropTypes.string,
  close: PropTypes.string,
  icon: PropTypes.string
}
