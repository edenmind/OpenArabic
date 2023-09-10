import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper'

import { checkIfWithinLast36Hours } from '../services/utility-service.js'

export const CardFooter = ({ text }) => {
  const { createdAt, views, timeAgo, readingTime } = text
  const theme = useTheme()

  const isWithinLast36Hours = checkIfWithinLast36Hours(createdAt)

  const footerItems = [views && `${views} views`, timeAgo, readingTime && `${readingTime} mins read`]
    .filter(Boolean)
    .join(' · ')

  return (
    <>
      {isWithinLast36Hours && (
        <Chip mode="flat" compact style={styles.chip(theme.colors.elevation.level0)}>
          New ☀️
        </Chip>
      )}

      <Text variant="labelSmall" style={styles.footerText(theme.colors.outline)}>
        {footerItems}
      </Text>
    </>
  )
}

const styles = StyleSheet.create({
  chip: (backgroundColor) => ({
    backgroundColor,
    bottom: 14,
    left: 15,
    position: 'absolute'
  }),
  footerText: (color) => ({
    bottom: 20,
    color,
    position: 'absolute',
    right: 15
  })
})

CardFooter.propTypes = {
  text: PropTypes.shape({
    createdAt: PropTypes.string,
    publishAt: PropTypes.string,
    readingTime: PropTypes.string,
    timeAgo: PropTypes.string,
    views: PropTypes.string
  })
}
