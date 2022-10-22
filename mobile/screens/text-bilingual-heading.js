import { Caption, Subheading, Title } from 'react-native-paper'
import { Image, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const style = StyleSheet.create({
  author: {
    textAlign: 'center'
  },
  image: {
    height: 250,
    width: '100%'
  },
  reading: {
    paddingBottom: 10,
    textAlign: 'center'
  },
  source: {
    fontStyle: 'italic',
    paddingBottom: 10,
    textAlign: 'center'
  },
  title: {
    paddingTop: 45,
    textAlign: 'center'
  }
})

export default function TextBilingualHeading(props) {
  return (
    <Fragment>
      <Image source={{ uri: props.heading.image }} style={style.image} />
      <Title style={style.title}>{props.heading.title}</Title>
      <Subheading style={style.author}>{props.heading.author}</Subheading>
      <Subheading style={style.source}>{props.heading.source}</Subheading>
      <Caption style={style.reading}>{props.heading.readingTime}</Caption>
    </Fragment>
  )
}

TextBilingualHeading.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    readingTime: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  })
}
