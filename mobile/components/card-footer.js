import { checkIfWithinLast36Hours } from '../services/utility-service.js'
import { Chip, Text, useTheme } from 'react-native-paper'
import React from 'react'
import PropTypes from 'prop-types'

export const CardFooter = ({ text }) => {
  const theme = useTheme()

  const isWithinLast36Hours = checkIfWithinLast36Hours(text.createdAt)
  const footer = `${text.views} views · ${text.timeAgo} · ${text.readingTime}  `

  return (
    <>
      {isWithinLast36Hours && (
        <Chip
          selectedColor={theme.colors.onTertiaryContainer}
          mode={'flat'}
          compact={true}
          style={{
            position: 'absolute',
            left: 'auto',
            right: 10,
            bottom: 10,
            backgroundColor: theme.colors.tertiaryContainer
          }}
        >
          New ☀️
        </Chip>
      )}

      <Text variant="labelSmall" style={{ color: theme.colors.outline }}>
        {footer}
      </Text>
    </>
  )
}

CardFooter.propTypes = {
  text: PropTypes.shape({
    createdAt: PropTypes.string,
    publishAt: PropTypes.string,
    views: PropTypes.string,
    timeAgo: PropTypes.string,
    readingTime: PropTypes.string
  })
}
