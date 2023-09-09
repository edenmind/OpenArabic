import 'react-native-gesture-handler'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { Platform, View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'

export function ArabicWordButton({ word, isSelected, theme, sharedStyle, onSelect }) {
  const [isFading, setIsFading] = useState(false)
  const [lineFading, setLineFading] = useState(false)

  useEffect(() => {
    if (isSelected) {
      const textColorTimer = setTimeout(() => {
        setIsFading(true)
      }, 2500)

      const lineFadeTimer = setTimeout(() => {
        setLineFading(true)
      }, 2500)

      return () => {
        clearTimeout(textColorTimer)
        clearTimeout(lineFadeTimer)
      }
    }

    setIsFading(false)
    setLineFading(false)
  }, [isSelected])

  const backgroundColor = isSelected && !lineFading ? theme.colors.tertiary : theme.colors.elevation.level0
  const backgroundColorText = isSelected && !isFading ? theme.colors.tertiary : theme.colors.secondary

  return (
    <Button style={styles.button} onPress={onSelect}>
      <View style={{ borderBottomColor: backgroundColor, borderBottomWidth: 3 }}>
        <Text
          style={[
            sharedStyle.arabicBody,
            styles.text,
            {
              color: backgroundColorText,
              lineHeight: Platform.OS === 'android' ? 90 : 50
            }
          ]}
        >
          {word.arabic}
        </Text>
      </View>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    marginBottom: -10,
    marginHorizontal: -8
  },
  text: {}
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
