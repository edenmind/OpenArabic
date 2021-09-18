import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Paragraph } from "react-native-paper";
import * as utility from "../../../services/UtilityService";
import * as api from "../../../services/ApiService";

const LeftContent = (props) => (
  <Avatar.Icon {...props} icon="text" mode="elevated" />
);

export function TextListScreen({ route, navigation }) {
  const { category } = route.params;

  const [texts, setTexts] = useState([{ textId: 0, name: "Adab" }]);

  useEffect(() => {
    async function fetchData() {
      const pageSize = 7;
      const pageNumber = 0;
      const texts = await api.getTexts(category, pageSize, pageNumber);
      setTexts(texts);
    }
    fetchData();
  }, [textItems]);

  const textItems = texts.map((text) => (
    <Card
      key={text.textId}
      onPress={() =>
        navigation.navigate("SingleText", {
          textId: text.textId,
        })
      }
    >
      <Card.Title
        title={text.title}
        subtitle={text.author}
        left={LeftContent}
      />
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      <Card.Content>
        <Paragraph>{utility.truncate(`${text.englishText}`, 155)}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  ));

  return <ScrollView>{textItems}</ScrollView>;
}

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
