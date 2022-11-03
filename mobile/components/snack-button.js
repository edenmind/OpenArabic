import { StyleSheet, View } from 'react-native'
import * as React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from 'react-native-paper'

const SnackButton = (props) => {
  return (
    <View style={styles.container}>
      <Snackbar style={styles.snack} visible={props.visible} onDismiss={props.onDismissSnackBar} duration={1000}>
        {props.text}
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
})

export default SnackButton

SnackButton.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismissSnackBar: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}
