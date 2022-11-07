import { Text } from 'react-native-paper'
import { Image, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const style = StyleSheet.create({
  author: {
    paddingTop: 15,
    textAlign: 'center'
  },
  image: {
    height: 250,
    width: '100%'
  },
  reading: {
    paddingBottom: 10,
    paddingTop: 20,
    textAlign: 'center'
  },
  title: {
    paddingTop: 45,
    textAlign: 'center'
  }
})

export default function TextBilingualHeading(props) {
  const author = `${props.heading.author} ·  ${props.heading.source}`
  const caption = `${props.heading.readingTime} · ${props.heading.views} views · ${props.heading.timeAgo}`

  return (
    <Fragment>
      <Image source={{ uri: props.heading.image }} style={style.image} />
      <Text variant="titleLarge" style={style.title}>
        {props.heading.title}
      </Text>
      <Text variant="titleMedium" style={style.author}>
        {author}
      </Text>
      <Text variant="labelMedium" style={style.reading}>
        {caption}
      </Text>
    </Fragment>
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
