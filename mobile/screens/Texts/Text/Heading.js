/* eslint-disable import/namespace */
import { StyleSheet } from 'react-native'
import { Subheading, Title } from 'react-native-paper'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const style = StyleSheet.create({
  author: {
    paddingTop: 25,
    textAlign: 'center'
  },
  readTime: {
    paddingTop: 20,
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

export default function Heading(props) {
  return (
    <Fragment>
      <Title style={style.title}>{props.heading.title}</Title>
      <Subheading style={style.author}>{props.heading.author}</Subheading>
      <Subheading style={style.source}>{props.heading.source}</Subheading>
      <Subheading style={style.readTime}>{props.heading.readTime}</Subheading>
    </Fragment>
  )
}

Heading.propTypes = {
  heading: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    source: PropTypes.string,
    readTime: PropTypes.string
  })
}
