import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'

export function PracticeCheckbox({ label, note, isChecked }) {
  // add onToggle
  const theme = useTheme()
  const textColor = isChecked ? theme.colors.onBackground : theme.colors.outline

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 10
      }}
    >
      <View>
        <Text variant="headlineSmall" style={{ color: textColor }}>
          {label}
        </Text>
        <Text variant="labelLarge" style={{ color: textColor }}>
          {note}
        </Text>
      </View>
    </View>
  )

  // return (
  //   <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
  //     <View
  //       style={{
  //         alignItems: 'center',
  //         flexDirection: 'row',
  //         marginHorizontal: 15,
  //         marginVertical: 10
  //       }}
  //     >
  //       <Checkbox status={isChecked ? 'checked' : 'unchecked'} />
  //       <View>
  //         <Text variant="headlineSmall" style={{ color: textColor }}>
  //           {label}
  //         </Text>
  //         <Text variant="labelLarge" style={{ color: textColor }}>
  //           {note}
  //         </Text>
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // )
}

PracticeCheckbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired
  // onToggle: PropTypes.func.isRequired
}
