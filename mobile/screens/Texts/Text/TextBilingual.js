/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Title,
  Subheading,
  Paragraph,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import * as api from '../../../services/ApiService';
export default function TextBilingual({ route }) {
  const style = StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
  });
  const { textId } = route.params;
  const [text, setText] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      const textFromApi = await api.getText(textId);
      setText(textFromApi);
    }
    fetchData();
  }, [setText]);

  if (text.title) {
    return (
      <ScrollView>
        <Title>{text.title}</Title>
        <Subheading>{text.author}</Subheading>
        <Paragraph>{text.englishText}</Paragraph>
      </ScrollView>
    );
  }
  return (
    <ActivityIndicator
      animating
      size="large"
      color={Colors.red800}
      style={style.container}
    />
  );
}

TextBilingual.propTypes = {
  route: PropTypes.any.isRequired,
};
