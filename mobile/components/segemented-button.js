import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { SegmentedButtons, Text } from 'react-native-paper'

export const SegmentButtonWithHeader = (props) => {
  const { title, value, onValueChange, buttons } = props

  const textWithMarginStyle = {
    marginVertical: 5
  }

  return (
    <View style={{ paddingBottom: 10 }}>
      <Text variant="labelLarge" style={textWithMarginStyle}>
        {title}
      </Text>

      <SegmentedButtons
        density="regular"
        value={value}
        onValueChange={(value) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          onValueChange(value)
        }}
        buttons={buttons}
      />
    </View>
  )
}

SegmentButtonWithHeader.propTypes = {
  title: PropTypes.string.isRequired,
  buttons: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  onValueChange: PropTypes.func.isRequired
}
