import React, { useContext } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import SideBar from "../components/Sidebar";
import AddProduct from "../screens/AddProduct";

const Drawer = createDrawerNavigator();

export default () => {
  // const state = useContext(UserContex);

  // if (state.isLoading === true) {
  //   return <SplashScreen />;
  // }

  return (
    <Drawer.Navigator initialRouteName="Нүүр"
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
      <Drawer.Screen name="Нүүр" component={HomeScreen} options={() => ({
        headerBackTitleVisible: false,
        headerTruncatedBackTitle: "",
      })} />
      <Drawer.Screen name="Бараа нэмэх" component={AddProduct} options={() => ({
        headerBackTitleVisible: true,
        headerTruncatedBackTitle: "Буцах",
      })} />

      {/* <Drawer.Screen name="Бараа" component={ProductScreen} options={() => ({
        headerBackTitleVisible: false,
        headerTruncatedBackTitle: "",
      })} /> */}
    </Drawer.Navigator >
  );
};
