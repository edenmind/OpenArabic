import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TextDrawer } from "./TextList/TextDrawer";
import { CustomNavigationBar } from "../../components/layout/CustomNavigationBar";
import { TextScreen } from "./Text/TextScreen";

const Stack = createStackNavigator();

export default function TextNavigator() {
  return (
    <Stack.Navigator
    // initialRouteName="Texts"
    // screenOptions={{
    //   header: (props) => <CustomNavigationBar {...props} />,
    // }}
    >
      <Stack.Screen name="Texts" component={TextDrawer} />
      <Stack.Screen name="SingleText" component={TextScreen} />
    </Stack.Navigator>
  );
}
