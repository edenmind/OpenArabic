import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Title, Subheading, Paragraph, ActivityIndicator, Colors } from "react-native-paper";
import * as api from "../../../services/ApiService";

export default function TextBilingual({ route }) {
  const { textId } = route.params;
  const [text, setText] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      const textFromApi = await api.getText(textId);
      setText(textFromApi);
    }
    fetchData();
  }, [textId]);

  if (text.title) {
    return (
      <ScrollView>
        <Title>{text.title}</Title>
        <Subheading>{text.author}</Subheading>
        <Paragraph>{text.englishText}</Paragraph>
      </ScrollView>
    );
  } else {
    return <ActivityIndicator animating={true} color={Colors.red800} style={style.container} />;
  }
}

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
