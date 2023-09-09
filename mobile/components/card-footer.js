import PropTypes from 'prop-types'
import React from 'react'
import { Chip, Text, useTheme } from 'react-native-paper'

import { checkIfWithinLast36Hours } from '../services/utility-service.js'

export const CardFooter = ({ text }) => {
  const theme = useTheme()

  const isWithinLast36Hours = checkIfWithinLast36Hours(text.createdAt)

  function appendIfDefined(value, label, resultArray) {
    if (value) {
      resultArray.push(`${value} ${label}`)
    }
  }

  function constructFooter(text) {
    const footerItems = []

    appendIfDefined(text.views, 'views', footerItems)
    appendIfDefined(text.timeAgo, '', footerItems) // No label for timeAgo
    appendIfDefined(text.readingTime, '', footerItems, '3 mins read') // No label for readingTime

    return footerItems.join(' · ')
  }

  const footer = constructFooter(text)

  return (
    <>
      {isWithinLast36Hours && (
        <Chip
          mode={'flat'}
          compact={true}
          style={{
            backgroundColor: theme.colors.elevation.level0,
            bottom: 14,
            left: 15,
            position: 'absolute'
          }}
        >
          New ☀️
        </Chip>
      )}

      <Text variant="labelSmall" style={{ bottom: 20, color: theme.colors.outline, position: 'absolute', right: 15 }}>
        {footer}
      </Text>
    </>
  )
}

CardFooter.propTypes = {
  text: PropTypes.shape({
    createdAt: PropTypes.string,
    publishAt: PropTypes.string,
    readingTime: PropTypes.string,
    timeAgo: PropTypes.string,
    views: PropTypes.string
  })
}
