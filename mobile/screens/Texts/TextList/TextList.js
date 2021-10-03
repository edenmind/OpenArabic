/* eslint-disable import/named */
/* eslint-disable import/namespace */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Pressable, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import * as api from '../../../services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';
import TextCard from './TextCard';

export function TextList({ route, navigation }) {
  const { category } = route.params;

  const { texts } = useSelector((state) => state.texts);
  const dispatch = useDispatch();
  const fetchTexts = () => dispatch(api.getTexts(category, 7, 0));

  useEffect(() => {
    fetchTexts();
  });

  const cards = texts.map((text) => (
    <Pressable
      key={text.textId}
      onPress={() =>
        navigation.navigate('SingleText', {
          textId: text.textId,
        })
      }>
      <TextCard text={text}></TextCard>
      <Divider />
    </Pressable>
  ));

  if (texts.length > 1) {
    return <ScrollView>{cards}</ScrollView>;
  }
  return <Spinner />;
}

TextList.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
};
