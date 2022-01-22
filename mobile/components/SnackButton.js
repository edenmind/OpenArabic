import * as React from 'react'
// eslint-disable-next-line import/namespace
import { View, StyleSheet } from 'react-native'
import { Button, Snackbar } from 'react-native-paper'

const SnackButton = () => {
  const [visible, setVisible] = React.useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const text = 'Hey there! I am a Snackbar.'

  return (
    <View style={styles.container}>
      <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          }
        }}>
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
  // dummy: PropTypes.bool.isRequired
}
