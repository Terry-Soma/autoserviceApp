import React, { useContext } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";

const Drawer = createDrawerNavigator();

export default () => {
  // const state = useContext(UserContex);

  // if (state.isLoading === true) {
  //   return <SplashScreen />;
  // }

  return (
    <Drawer.Navigator initialRouteName="Нүүр" screenOptions={{
      headerStyle: { backgroundColor: "#3498DB" },
      headerTintColor: "white",
      headerTitleStyle: { fontSize: 16, letterSpacing: 1.2, fontWeight: "bold" },
    }}
    >
      <Drawer.Screen name="Нүүр" component={HomeScreen} />
      <Drawer.Screen name="Бүтээгдэхүүн" component={ProductScreen} options={() => ({
        headerBackTitleVisible: false,
        headerTruncatedBackTitle: "",
      })} />
    </Drawer.Navigator >
  );
};
