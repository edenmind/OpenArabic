import React, { useState, useEffect, Fragment } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Avatar, Button, Card, Paragraph, Divider, ActivityIndicator, Colors } from "react-native-paper";
import * as utility from "../../../services/UtilityService";
import * as api from "../../../services/ApiService";

const LeftContent = (props) => <Avatar.Icon {...props} icon="text" mode="elevated" />;

export function TextListScreen({ route, navigation }) {
  const { category } = route.params;
  const [texts, setTexts] = useState([{ textId: 0, name: "Adab" }]);

  const textItems = texts.map((text) => (
    <Fragment key={text.textId}>
      <Card
        style={style.card}
        onPress={() =>
          navigation.navigate("SingleText", {
            textId: text.textId,
          })
        }
      >
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Title title={text.title} subtitle={`${text.author} (${text.readTime})`} left={LeftContent} />
        <Card.Content>
          <Paragraph>{utility.removeLinebreak(utility.truncate(`${text.englishText}`, 155))}</Paragraph>
          <Paragraph style={style.arabic}>{utility.removeLinebreak(utility.truncate(`${text.arabicText}`, 125))}</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Share</Button>
          <Button>Like</Button>
        </Card.Actions>
      </Card>
      <Divider />
    </Fragment>
  ));

  useEffect(() => {
    async function fetchData() {
      const pageSize = 7;
      const pageNumber = 0;
      const texts = await api.getTexts(category, pageSize, pageNumber);
      setTexts(texts);
    }
    fetchData();
  }, [textItems]);

  if (texts.length > 1) {
    return <ScrollView>{textItems}</ScrollView>;
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

  card: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },

  arabic: {
    fontSize: 21,
    direction: "rtl",
    lineHeight: 30,
    writingDirection: "rtl",
  },
});
