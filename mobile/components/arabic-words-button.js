import 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'

export function ArabicWordButton({ word, isSelected, theme, sharedStyle, onSelect }) {
  const [fadeTimeout, setFadeTimeout] = useState(false)

  useEffect(() => {
    let timer

    if (isSelected) {
      timer = setTimeout(() => {
        setFadeTimeout(true)
      }, 2500)
    } else {
      setFadeTimeout(false)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isSelected])

  const backgroundColor = isSelected && !fadeTimeout ? theme.colors.tertiary : theme.colors.elevation.level0
  const textColor = isSelected && !fadeTimeout ? theme.colors.tertiary : theme.colors.secondary
  const lineHeight = Platform.OS === 'android' ? 90 : 50

  const textStyles = [
    sharedStyle.arabicBody,
    styles.text,
    {
      color: textColor,
      lineHeight
    }
  ]

  return (
    <Button style={styles.button} onPress={onSelect}>
      <View style={{ borderBottomColor: backgroundColor, borderBottomWidth: 3 }}>
        <Text style={textStyles}>{word.arabic}</Text>
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: -10,
    marginHorizontal: -8
  }
})

ArabicWordButton.propTypes = {
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  sharedStyle: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  word: PropTypes.shape({
    arabic: PropTypes.string,
    filename: PropTypes.string
  })
}
