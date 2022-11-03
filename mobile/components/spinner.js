import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})

const Spinner = () => <ActivityIndicator animating size="large" style={style.container} />

export default Spinner
