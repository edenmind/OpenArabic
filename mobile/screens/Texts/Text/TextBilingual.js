/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import Sentences from './Sentences';
import Heading from './Heading';
export default function TextBilingual() {
  const selector = (state) => state.text;
  const { text } = useSelector(selector);

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
