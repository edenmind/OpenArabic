import { Caption, Subheading, Title } from 'react-native-paper'
import React, { Fragment } from 'react'

import PropTypes from 'prop-types'
/* eslint-disable import/namespace */
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  author: {
    textAlign: 'center'
  },
  source: {
    paddingBottom: 10,
    textAlign: 'center'
  },
  title: {
    paddingTop: 55,
    textAlign: 'center'
  }
})

export default function TextBilingualHeading(props) {
  return (
    <Fragment>
      <Title style={style.title}>{props.heading.title}</Title>
      <Subheading style={style.author}>{props.heading.author}</Subheading>
      <Caption style={style.source}>{props.heading.source}</Caption>
    </Fragment>
  )
}

TextBilingualHeading.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  })
}
