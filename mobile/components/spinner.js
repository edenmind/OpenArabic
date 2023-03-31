import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const Spinner = () => <ActivityIndicator animating size="large" style={styles.container} />

export default Spinner
