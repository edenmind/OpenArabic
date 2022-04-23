import React, { Fragment } from 'react'
import { Subheading, Title } from 'react-native-paper'

import PropTypes from 'prop-types'
/* eslint-disable import/namespace */
import { StyleSheet } from 'react-native'

const style = StyleSheet.create({
  author: {
    paddingTop: 25,
    textAlign: 'center'
  },
  source: {
    fontStyle: 'italic',
    textAlign: 'center'
  },
  title: {
    fontSize: 25,
    paddingTop: 55,
    textAlign: 'center'
  }
})

export default function TextHeading(props) {
  return (
    <Fragment>
      <Title style={style.title}>{props.heading.title}</Title>
      <Subheading style={style.author}>{props.heading.author}</Subheading>
      <Subheading style={style.source}>{props.heading.source}</Subheading>
    </Fragment>
  )
}

TextHeading.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired
  })
}
