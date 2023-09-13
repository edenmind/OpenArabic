import PropTypes from 'prop-types'
import React from 'react'
import { Image } from 'react-native'
import { Text, Divider, useTheme } from 'react-native-paper'

import { useSharedStyles } from '../styles/common.js'

export default function TextBilingualHeading({ heading }) {
  const { author, source, readingTime, views, timeAgo, image, title } = heading
  const caption = `${readingTime} · ${views} views · ${timeAgo}`
  const theme = useTheme()
  const style = useSharedStyles(theme)

  return (
    <>
      <Image source={{ uri: image }} style={style.image} />
      <Text variant="headlineMedium" style={style.title}>
        {title}
      </Text>

      <Text variant="titleMedium" style={style.author}>
        {author}
      </Text>
      <Text variant="titleMedium" style={style.author}>
        {source}
      </Text>
      <Text variant="labelMedium" style={style.reading}>
        {caption}
      </Text>

      <Divider style={style.dividerHidden} />
    </>
  )
}

TextBilingualHeading.propTypes = {
  heading: PropTypes.shape({
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired
  })
}
