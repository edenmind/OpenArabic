/* eslint-disable import/named */
/* eslint-disable import/namespace */
import 'react-native-gesture-handler';
import React from 'react';
import { View } from 'react-native';
import { Title, Subheading, Paragraph } from 'react-native-paper';

export default function TextArabic() {
  const FILLER = 'Filler';

  return (
    <View>
      <Title>{FILLER}</Title>
      <Subheading>{FILLER}</Subheading>
      <Paragraph>{FILLER}</Paragraph>
    </View>
  );
}
