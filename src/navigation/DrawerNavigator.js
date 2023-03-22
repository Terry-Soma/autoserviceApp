import React, { useContext } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "../screens/HomeScreen";
import AddProductScreen from "../screens/AddProductScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PhoneInfoScreen from "../screens/PhoneInfoScreen";
import IncomeScreen from './../screens/IncomeScreen'
import { appbarColor, fontVar, headerTitleStyle } from "../../Constants";
import { IconButton } from "react-native-paper";
import SideBar from "./../components/Nav/Sidebar";
import ManageIncomeScreen from "../screens/ManageIncomeScreen";

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
        headerTitleStyle: headerTitleStyle,
      }}
      drawerContent={props => <SideBar {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Бараанууд" }} />
      <Drawer.Screen name="AddProduct" component={AddProductScreen} options={{ title: "Бараа нэмэх" }} />

      <Drawer.Screen name="PhoneInfo" component={PhoneInfoScreen} options={({ navigation }) => ({
        title: "Хэрэгтэй дугаарууд", headerRight: ({ tintColor }) => (

          <IconButton icon={"plus"} size={28} iconColor={tintColor} onPress={() => {
            navigation.navigate("ManagePhoneInfo")
          }} />
        )
      })}
      />

      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Income" component={IncomeScreen} options={{ title: "Зарсан бараанууд", }} />
      <Drawer.Screen name="ManageIncome" component={ManageIncomeScreen} options={{ title: "Орлогын мэдээлэл", }} />



    </Drawer.Navigator >
  );
};
