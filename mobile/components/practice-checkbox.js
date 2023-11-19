import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text, useTheme, Checkbox } from 'react-native-paper'

export function PracticeCheckbox({ label, note, isChecked, onToggle }) {
  // add onToggle
  const theme = useTheme()
  const textColor = isChecked ? theme.colors.onBackground : theme.colors.outline

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.9}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginHorizontal: 15,
          marginVertical: 5
        }}
      >
        <Checkbox status={isChecked ? 'checked' : 'unchecked'} />
        <View>
          <Text variant="headlineSmall" style={{ color: textColor }}>
            {label}
          </Text>
          <Text variant="labelLarge" style={{ color: textColor }}>
            {note}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

PracticeCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired
}
