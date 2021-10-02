/* eslint-disable import/named */
/* eslint-disable import/namespace */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Paragraph,
  Divider,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import * as utility from '../../../services/UtilityService';
import * as api from '../../../services/ApiService';

export function TextListScreen({ route, navigation }) {
  const { category } = route.params;
  const [texts, setTexts] = useState([{ textId: 0, name: 'Adab' }]);
  const SHARE = 'Share';
  const LIKE = 'Like';

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

    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
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

  useEffect(() => {
    async function fetchData() {
      const pageSize = 7;
      const pageNumber = 0;
      const result = await api.getTexts(category, pageSize, pageNumber);
      setTexts(result);
    }
    fetchData();
  }, [setTexts]);

  if (texts.length > 1) {
    return <ScrollView>{textItems}</ScrollView>;
  }
  return (
    <ActivityIndicator
      animating
      color={Colors.red800}
      style={style.container}
    />
  );
}

TextListScreen.propTypes = {
  route: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
};
