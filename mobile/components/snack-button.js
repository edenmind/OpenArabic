// eslint-disable-next-line import/namespace
import { StyleSheet, View } from 'react-native'
import * as React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from 'react-native-paper'
import PAPERTHEME from '../constants/paper-theme.js'
import COLORS from '../constants/colors.js'

const SnackButton = (props) => {
  return (
    <View style={styles.container}>
      <Snackbar
        style={styles.snack}
        visible={props.visible}
        onDismiss={props.onDismissSnackBar}
        theme={PAPERTHEME}
        backgroundColor={COLORS.leaf}
      >
        {props.text}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  snack: {
    backgroundColor: COLORS.darkOlive
  }
})

export default SnackButton

SnackButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}
