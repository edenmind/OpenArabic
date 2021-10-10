import React from "react";
import { Appbar } from "react-native-paper";
import { Menu } from "react-native-paper";
import { DrawerActions } from "@react-navigation/routers";

export function CustomNavigationBar({ navigation, previous }) {
  const openMenu = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const closeMenu = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}

      {!previous ? (
        <Menu
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="menu" color="white" onPress={openMenu} />
          }
        ></Menu>
      ) : null}
      <Appbar.Content title="Home" />
      <Appbar.Action icon="magnify" />
    </Appbar.Header>
  );
}
