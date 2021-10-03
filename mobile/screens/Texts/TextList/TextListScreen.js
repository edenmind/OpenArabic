/* eslint-disable import/named */
/* eslint-disable import/namespace */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Paragraph, Divider } from 'react-native-paper';
import * as utility from '../../../services/UtilityService';
import * as api from '../../../services/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../components/Spinner';

export function TextListScreen({ route, navigation }) {
  const { category } = route.params;
  const SHARE = 'Share';
  const LIKE = 'Like';

  const { texts } = useSelector((state) => state.texts);
  const dispatch = useDispatch();
  const fetchTexts = () => dispatch(api.getTexts(category, 7, 0));

  useEffect(() => {
    fetchTexts();
  });

  const style = StyleSheet.create({
    arabic: {
      direction: 'rtl',
      fontSize: 21,
      lineHeight: 30,
      writingDirection: 'rtl',
    },
    card: {
      marginBottom: 5,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
    },
  });

  const LeftContent = (props) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Avatar.Icon {...props} icon="text" mode="elevated" />
  );

  const textItems = texts.map((text) => (
    <Fragment key={text.textId}>
      <Card
        style={style.card}
        onPress={() =>
          navigation.navigate('SingleText', {
            textId: text.textId,
          })
        }>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title
          title={text.title}
          subtitle={`${text.author} (${text.readTime})`}
          left={LeftContent}
        />
        <Card.Content>
          <Paragraph>
            {utility.removeLineBreak(
              utility.truncate(`${text.englishText}`, 155),
            )}
          </Paragraph>
          <Paragraph style={style.arabic}>
            {utility.removeLineBreak(
              utility.truncate(`${text.arabicText}`, 125),
            )}
          </Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>{LIKE}</Button>
          <Button>{SHARE}</Button>
        </Card.Actions>
      </Card>
      <Divider />
    </Fragment>
  ));

  if (texts.length > 1) {
    return <ScrollView>{textItems}</ScrollView>;
  }
  return <Spinner />;
}

TextListScreen.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
};
