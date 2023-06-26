import { Text, Divider, useTheme, Surface } from 'react-native-paper'
import { Image, StyleSheet } from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

export default function TextBilingualHeading({ heading }) {
  const { author, source, readingTime, views, timeAgo, image, title, introduction } = heading
  const caption = `${readingTime} · ${views} views · ${timeAgo}`
  const theme = useTheme()
  const style = StyleSheet.create({
    author: {
      color: theme.colors.onSurfaceVariant,
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
      color: theme.colors.outline,
      paddingBottom: 10,
      paddingTop: 20,
      textAlign: 'center'
    },
    title: {
      color: theme.colors.onBackground,
      fontFamily: 'philosopher',
      paddingHorizontal: 25,
      paddingTop: 25,
      textAlign: 'center'
    }
  })

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

      {introduction && (
        <Surface style={{ padding: 15, borderRadius: 10, margin: 12 }} elevation={1}>
          <Text variant="labelLarge">{introduction}</Text>
        </Surface>
      )}
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
    source: PropTypes.string.isRequired,
    introduction: PropTypes.string.isOptional
  })
}
