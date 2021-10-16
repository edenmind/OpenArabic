/* eslint-disable import/namespace */
/* eslint-disable import/named */
import { StyleSheet } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import React from 'react';

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default function Spinner() {
  return (
    <ActivityIndicator
      animating
      size="large"
      color="#3e423a"
      style={style.container}
    />
  );
}
