import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }
})

const Spinner = () => <ActivityIndicator animating size={'large'} style={style.container} />

export default Spinner
