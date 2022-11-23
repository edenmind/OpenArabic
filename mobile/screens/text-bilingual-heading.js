import { Text, Divider } from 'react-native-paper'
import { Image, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const style = StyleSheet.create({
  author: {
    maxWidth: 300,
    paddingTop: 15,
    textAlign: 'center'
  },
  divider: {
    marginLeft: 33,
    marginRight: 33,
    marginTop: 33
  },
  image: {
    height: 250,
    width: '100%'
  },
  reading: {
    opacity: 0.7,
    paddingBottom: 10,
    paddingTop: 20,
    textAlign: 'center'
  },
  title: {
    fontFamily: 'philosopher',
    paddingTop: 45,
    textAlign: 'center'
  }
})

export default function TextBilingualHeading(props) {
  const author = `${props.heading.author}`
  const source = `${props.heading.source}`

  const caption = `${props.heading.readingTime} · ${props.heading.views} views · ${props.heading.timeAgo}`

  return (
    <Fragment>
      <Image source={{ uri: props.heading.image }} style={style.image} />
      <Text variant="headlineMedium" style={style.title}>
        {props.heading.title}
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
