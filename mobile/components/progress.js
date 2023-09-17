import PropTypes from 'prop-types'
import React from 'react'
import { ProgressBar, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

export const Progress = ({ progress }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)
  return 
}

Progress.propTypes = {
  progress: PropTypes.number.isRequired
}
