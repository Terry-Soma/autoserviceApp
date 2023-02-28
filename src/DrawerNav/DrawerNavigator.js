import React, { useContext } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import SideBar from "../components/Sidebar";
import AddProductScreen from "../screens/AddProductScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PhoneInfoScreen from "../screens/PhoneInfoScreen";

import { appbarColor } from "../../Constants";


const Drawer = createDrawerNavigator();

export default () => {
  // const state = useContext(UserContex);

  // if (state.isLoading === true) {
  //   return <SplashScreen />;
  // }

  return (
    <Drawer.Navigator initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerType: 'back',
        headerStyle: { backgroundColor: appbarColor },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 16, },
      }}
      drawerContent={props => <SideBar {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Бараа нэмэх" component={AddProductScreen} />

      <Drawer.Screen name="Барааны мэдээлэл" component={ProductScreen} />
      <Drawer.Screen name="Утасны мэдээлэл" component={PhoneInfoScreen} />

      <Drawer.Screen name="Тохиргоо" component={SettingsScreen} />

    </Drawer.Navigator >
  );
};
