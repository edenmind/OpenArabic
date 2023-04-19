import { Text, Divider } from 'react-native-paper'
import { Image, StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'
import { paperDarkTheme } from '../constants/paper-theme.js'

const style = StyleSheet.create({
  author: {
    color: paperDarkTheme.colors.onSurfaceVariant,
    marginLeft: 35,
    marginRight: 35,
    paddingTop: 15,
    textAlign: 'center'
  },
  divider: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 25
  },
  image: {
    height: 250,
    width: '100%'
  },
  reading: {
    color: paperDarkTheme.colors.outline,
    paddingBottom: 10,
    paddingTop: 20,
    textAlign: 'center'
  },
  title: {
    color: paperDarkTheme.colors.onBackground,
    fontFamily: 'philosopher',
    paddingTop: 25,
    textAlign: 'center'
  }
})

export default function TextBilingualHeading({ heading }) {
  const { author, source, readingTime, views, timeAgo, image, title } = heading
  const caption = `${readingTime} · ${views} views · ${timeAgo}`

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
      <Divider style={style.divider} />
    </>
  )
}

TextBilingualHeading.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    views: PropTypes.string.isRequired,
    timeAgo: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  })
}
