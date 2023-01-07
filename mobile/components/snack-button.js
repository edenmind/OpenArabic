import { StyleSheet, View } from 'react-native'
import * as React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, Text } from 'react-native-paper'
import { paperDarkTheme } from '../constants/paper-theme.js'
import { useSharedStyles } from '../styles/common.js'

const SnackButton = (props) => {
  const sharedStyle = useSharedStyles()
  return (
    <View>
      <Snackbar
        styles={styles.snack}
        theme={paperDarkTheme}
        style={styles.snack}
        visible={props.visible}
        onDismiss={props.onDismissSnackBar}
        duration={props.duration || 350}
      >
        <Text style={{ ...sharedStyle.englishBody, color: paperDarkTheme.colors.onPrimary }} variant="headlineLarge">
          {props.text}
        </Text>
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  snack: {
    backgroundColor: paperDarkTheme.colors.secondary
  }
})

export default SnackButton

SnackButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired
}
