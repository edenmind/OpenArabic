import PropTypes from 'prop-types'
import React from 'react'
import { Text, Surface, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

const CategoryIntro = ({ text }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <Surface style={{ ...sharedStyle.container }} elevation={0}>
      <Text variant="labelLarge">{text}</Text>
    </Surface>
  )
}

export default CategoryIntro

CategoryIntro.propTypes = {
  text: PropTypes.string.isRequired
}
