/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
export default function TextEnglish({}) {
  const style = StyleSheet.create({
    english: {
      flex: 1,
      direction: 'ltr',
      fontSize: 17,
      lineHeight: 27,
      writingDirection: 'ltr',
      padding: 25,
    },
  });

  // @ts-ignore
  const { text } = useSelector((state) => state.text);

  if (text.title) {
    return (
      <ScrollView>
        <Paragraph style={style.english}>{text.englishText}</Paragraph>
      </ScrollView>
    );
  }
  return <Spinner />;
}

TextEnglish.propTypes = {
  route: PropTypes.any.isRequired,
};
