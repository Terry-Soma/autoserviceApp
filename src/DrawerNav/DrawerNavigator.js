import React, { useContext } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import SideBar from "../components/Sidebar";
import AddProductScreen from "../screens/AddProductScreen";
import SettingsScreen from "../screens/SettingsScreen";


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
        overlayColor: '#00000044',
        headerStyle: { backgroundColor: "#3498DB" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 16, },
      }}
      drawerContent={props => <SideBar {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Бараа нэмэх" component={AddProductScreen} />

      <Drawer.Screen name="Барааны мэдээлэл" component={ProductScreen} />

      <Drawer.Screen name="Тохиргоо" component={SettingsScreen} />

    </Drawer.Navigator >
  );
};
