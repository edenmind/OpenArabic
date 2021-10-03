/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import Sentences from './Sentences';
import Heading from './Heading';
export default function TextBilingual({}) {
  const style = StyleSheet.create({
    arabic: {
      flex: 1,
      direction: 'rtl',
      fontSize: 25,
      lineHeight: 35,
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
        <Sentences sentences={text.sentences}></Sentences>
      </ScrollView>
    );
  }
  return <Spinner />;
}

TextBilingual.propTypes = {
  route: PropTypes.any.isRequired,
};
