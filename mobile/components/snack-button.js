import { StyleSheet, View } from 'react-native'
import * as React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from 'react-native-paper'
import { paperDarkTheme } from '../constants/paper-theme.js'

const SnackButton = (props) => {
  return (
    <View>
      <Snackbar
        styles={styles.snack}
        theme={paperDarkTheme}
        style={styles.snack}
        visible={props.visible}
        onDismiss={props.onDismissSnackBar}
        duration={1000}
      >
        {props.text}
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
  text: PropTypes.string.isRequired
}
