import * as Haptics from 'expo-haptics'
import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { Surface, Button, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

export const PracticeNotify = ({ children, showButton = false, setVisiblePractice }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  return (
    <Surface
      elevation={1}
      style={{
        ...sharedStyle.container,
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderBottomWidth: 4,
        borderColor: theme.colors.elevation.level2,
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: 'row',
        marginBottom: 4
      }}
    >
      <View style={{ ...sharedStyle.container, flex: 1 }}>{children}</View>
      {showButton && (
        <Button
          icon={'brain'}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            setVisiblePractice(true)
          }}
        >
          Practice
        </Button>
      )}
    </Surface>
  )
}

PracticeNotify.propTypes = {
  children: PropTypes.node.isRequired,
  setVisiblePractice: PropTypes.func,
  showButton: PropTypes.bool
}
