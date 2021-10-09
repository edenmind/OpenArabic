/* eslint-disable import/namespace */
/* eslint-disable import/named */
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import React, { Fragment } from 'react';

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    flex: 1,
    fontSize: 25,
    lineHeight: 35,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 35,
    writingDirection: 'rtl',
  },
  bottomPadding: {
    paddingBottom: 55,
  },
  english: {
    direction: 'ltr',
    flex: 1,
    fontSize: 17,
    lineHeight: 25,
    paddingLeft: 15,
    paddingRight: 15,
    writingDirection: 'ltr',
  },
});

export default function Sentences(props) {
  const sentences = props.sentences.map((sentence) => (
    <Fragment key={sentence.sentenceId}>
      <Paragraph style={style.arabic}>{sentence.arabic}</Paragraph>
      <Paragraph style={style.english}>{sentence.english}</Paragraph>
    </Fragment>
  ));

  return <View style={style.bottomPadding}>{sentences}</View>;
}
