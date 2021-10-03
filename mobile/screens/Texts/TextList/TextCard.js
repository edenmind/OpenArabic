import { StyleSheet } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import React from 'react';
import { Avatar, Paragraph } from 'react-native-paper';
import * as utility from '../../../services/UtilityService';

const style = StyleSheet.create({
  arabic: {
    direction: 'rtl',
    fontSize: 21,
    lineHeight: 30,
    writingDirection: 'rtl',
  },
  card: {
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  chip: {
    paddingLeft: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
});

const SHARE = 'Share';
const LIKE = 'Like';

const LeftContent = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Avatar.Icon {...props} icon="text" mode="elevated" />
);

export default function TextCard(props) {
  return (
    <Card style={style.card}>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Title
        title={props.text.title}
        subtitle={`${props.text.author} (${props.text.timeAgo})`}
        left={LeftContent}
      />
      <Card.Content>
        <Paragraph>
          {utility.removeLineBreak(
            utility.truncate(`${props.text.englishText}`, 155),
          )}
        </Paragraph>
        <Paragraph style={style.arabic}>
          {utility.removeLineBreak(
            utility.truncate(`${props.text.arabicText}`, 125),
          )}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={style.chip}>
        <Chip>{props.text.category}</Chip>
      </Card.Actions>
    </Card>
  );
}
