import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TextBilingual from "./TextBilingual";
import TextEnglish from "./TextEnglish";
import TextArabic from "./TextArabic";

const Tab = createMaterialTopTabNavigator();

export function TextScreen({ route }) {
  const { textId } = route.params;

  const screenArray = [
    { name: "Bilingual", component: TextBilingual },
    { name: "Arabic", component: TextArabic },
    { name: "English", component: TextEnglish },
  ];

  const screens = screenArray.map((screen) => (
    <Tab.Screen
      name={screen.name}
      component={screen.component}
      initialParams={{ textId: textId }}
      key={screen.name}
    />
  ));

  return <Tab.Navigator>{screens}</Tab.Navigator>;
}
