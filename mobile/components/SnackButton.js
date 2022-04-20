import * as React from 'react'

// eslint-disable-next-line import/namespace
import { StyleSheet, View } from 'react-native'

import PropTypes from 'prop-types'
import { Snackbar } from 'react-native-paper'

const SnackButton = (props) => {
  const text = 'MashaAllah! You made it... 🎉🎉🎉'

  return (
    <View style={styles.container}>
      <Snackbar visible={props.visible} onDismiss={props.onDismissSnackBar}>
        {text}
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
  onDismissSnackBar: PropTypes.func.isRequired
}
