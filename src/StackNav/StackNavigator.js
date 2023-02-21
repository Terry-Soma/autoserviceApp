import React from "react";
import { Alert } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton
} from "@react-navigation/stack";
import { mainColor } from "../../Constants";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import AddProduct from "../screens/AddProductScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DrawerNavigator from "../DrawerNav/DrawerNavigator";


const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: mainColor },
      headerTintColor: "white",
      headerTitleStyle: { fontSize: 22 }
    }}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={DrawerNavigator}
      options={({ navigation }) => ({
        title: "Hello"
      })}
    />

    {/* <Stack.Screen
      name="Бараа нэмэх"
      component={DrawerNavigator}
      options={{
        headerBackTitleVisible: true,
        headerBackTitle: "Буцах",
        headerTruncatedBackTitle: "",
      }}
    /> */}
    <Stack.Screen
      name="Барааны мэдээлэл"
      component={ProductScreen}
      options={{ presentation: "modal", headerShown: false }}
    />
    {/* <Stack.Screen
      name="Тохиргоо"
      component={DrawerNavigator}
      options={({ navigation }) => ({
        title: "Тохиргоо"
      })}
    /> */}
  </Stack.Navigator>

);
