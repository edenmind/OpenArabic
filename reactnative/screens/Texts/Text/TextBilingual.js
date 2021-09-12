import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { Title, Subheading, Paragraph } from "react-native-paper";
import * as api from "../../../services/ApiService";

export default function TextBilingual({ route }) {
  const { textId } = route.params;
  const [text, setText] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      console.log(textId);
      const textFromApi = await api.getText(textId);
      setText(textFromApi);
    }
    fetchData();

    console.log("This is the text we got!" + text);
  }, [textId]);

  return (
    <ScrollView>
      <Title>{text.title}</Title>
      <Subheading>{text.author}</Subheading>
      <Paragraph>{text.englishText}</Paragraph>
    </ScrollView>
  );
}
