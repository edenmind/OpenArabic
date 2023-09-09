import PropTypes from 'prop-types'
import React from 'react'
import { ProgressBar, useTheme } from 'react-native-paper'

export const Progress = ({ progress }) => {
  const theme = useTheme()
  return (
    <ProgressBar
      color={theme.colors.tertiary}
      progress={progress}
      style={{ backgroundColor: theme.colors.elevation.level5, borderRadius: 10, height: 10, marginVertical: 10 }}
    />
  )
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired
}
