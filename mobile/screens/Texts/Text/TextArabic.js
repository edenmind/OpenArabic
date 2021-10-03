/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import { ScrollView, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../../../components/Spinner';
import Heading from './Heading';
export default function TextArabic({}) {
  const style = StyleSheet.create({
    arabic: {
      flex: 1,
      direction: 'rtl',
      fontSize: 25,
      lineHeight: 45,
      writingDirection: 'rtl',
      padding: 25,
    },
  });

  // @ts-ignore
  const { text } = useSelector((state) => state.text);

  if (text.title) {
    return (
      <ScrollView>
        <Heading heading={text}></Heading>
        <Paragraph style={style.arabic}>{text.arabicText}</Paragraph>
      </ScrollView>
    );
  }
  return <Spinner />;
}

TextArabic.propTypes = {
  route: PropTypes.any.isRequired,
};
