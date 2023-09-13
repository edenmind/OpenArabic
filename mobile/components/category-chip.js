import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

export const CategoryChip = ({ category }) => {
  const theme = useTheme()
  const sharedStyle = useSharedStyles(theme)

  const styles = StyleSheet.create({
    chip: {
      backgroundColor: theme.colors.elevation.transparent,
      borderBottomWidth: 4,
      borderColor: theme.colors.elevation.level5,
      borderWidth: 2,
      marginRight: 15
    }
  })

  return (
    <View style={{ alignSelf: 'flex-start' }}>
      <Chip compact={true} style={styles.chip}>
        <Text style={sharedStyle.labelText}>{category.toUpperCase()}</Text>
      </Chip>
    </View>
  )
}

CategoryChip.propTypes = {
  category: PropTypes.string.isRequired
}
