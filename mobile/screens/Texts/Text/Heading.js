import { StyleSheet } from 'react-native';
import { Subheading, Title } from 'react-native-paper';
import React, { Fragment } from 'react';

const style = StyleSheet.create({
  title: {
    textAlign: 'center',
    paddingTop: 25,
  },
  subHeading: {
    textAlign: 'center',
  },
});

export default function Heading(props) {
  return (
    <Fragment>
      <Title style={style.title}>{props.heading.title}</Title>
      <Subheading style={style.subHeading}> {props.heading.author}</Subheading>
    </Fragment>
  );
}
