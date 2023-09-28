import PropTypes from 'prop-types'
import React from 'react'
import { View } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

export const CategoryChip = ({ category }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  return (
    <View style={{ alignSelf: 'flex-start' }}>
      <Chip compact={true} style={sharedStyle.chip}>
        <Text style={sharedStyle.labelText}>{category.toUpperCase()}</Text>
      </Chip>
    </View>
  )
}

CategoryChip.propTypes = {
  category: PropTypes.string.isRequired
}
