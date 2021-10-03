import { StyleSheet } from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import React, { Fragment } from 'react';

const style = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 25,
  },
  author: {
    paddingTop: 25,
    textAlign: 'center',
  },
  source: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  readTime: {
    paddingTop: 20,
    textAlign: 'center',
  },
});

export default function Heading(props) {
  return (
    <Fragment>
      <Title style={style.title}>{props.heading.title}</Title>
      <Subheading style={style.author}>{props.heading.author}</Subheading>
      <Subheading style={style.source}>{props.heading.source}</Subheading>
      <Subheading style={style.readTime}>{props.heading.readTime}</Subheading>
    </Fragment>
  );
}
