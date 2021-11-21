/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import { ScrollView, StyleSheet } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { useSelector } from 'react-redux';
import React from 'react';
import Spinner from '../../../components/Spinner';
import { useNavigation } from '@react-navigation/native';
export default function TextArabic() {
  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      flex: 1,
      fontSize: 25,
      lineHeight: 45,
      padding: 25,
      writingDirection: 'rtl',
    },
  });

  const selector = (state) => state.text;
  const { text } = useSelector(selector);

  const navigation = useNavigation();
  navigation.setOptions({ webTitle: text.title });

  if (text.title) {
    return (
      <ScrollView>
        <Paragraph style={style.arabic}>{text.arabicText}</Paragraph>
      </ScrollView>
    );
  }
  return <Spinner />;
}
