import "react-native-gesture-handler";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TextDrawer } from "./TextList/TextDrawer";
import { TextScreen } from "./Text/TextScreen";

const Stack = createNativeStackNavigator();

export default function TextNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={TextDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="SingleText" component={TextScreen} options={{ headerShown: true, headerTitle: "" }} />
    </Stack.Navigator>
  );
}
