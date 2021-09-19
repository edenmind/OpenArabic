import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { TextListScreen } from "./TextListScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import axios from "axios";

const Drawer = createDrawerNavigator();

export function TextDrawer() {
  const [categories, setCategories] = useState([{ categoryId: 0, name: "Adab" }]);
  const categoryItems = categories.map((category) => (
    <Drawer.Screen name={category.name} component={TextListScreen} initialParams={{ category: category.name }} options={{ title: category.name }} key={category.name} />
  ));

  useEffect(() => {
    axios.get("https://api.openarabic.io/api/categories").then(function (response) {
      setCategories(response.data);
    });
  }, [categoryItems]);

  return <Drawer.Navigator initialRouteName="Texts">{categoryItems}</Drawer.Navigator>;
}

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
