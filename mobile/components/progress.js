import React from 'react'
import { ProgressBar, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'

export const Progress = ({ progress }) => {
  const theme = useTheme()
  return (
    <ProgressBar
      color={theme.colors.tertiary}
      progress={progress}
      style={{ height: 10, borderRadius: 10, marginVertical: 10, backgroundColor: theme.colors.elevation.level5 }}
    />
  )
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired
}
