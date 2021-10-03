import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import React, { Fragment } from 'react';

const style = StyleSheet.create({
  arabic: {
    flex: 1,
    direction: 'rtl',
    fontSize: 25,
    lineHeight: 35,
    writingDirection: 'rtl',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 35,
  },
  english: {
    flex: 1,
    direction: 'ltr',
    fontSize: 17,
    lineHeight: 25,
    writingDirection: 'ltr',
    paddingLeft: 15,
    paddingRight: 15,
  },
  bottomPadding: {
    paddingBottom: 55,
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
