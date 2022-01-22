/* eslint-disable import/namespace */
/* eslint-disable import/named */
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import React from 'react'
import { COLORS } from '../constants/colors'

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
})

export default function Spinner() {
  return (
    <ActivityIndicator
      animating
      size="large"
      color={COLORS.leaf}
      style={style.container}
    />
  )
}
