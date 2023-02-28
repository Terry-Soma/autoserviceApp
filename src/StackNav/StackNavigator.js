import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import ProductScreen from "../screens/ProductScreen";
import DrawerNavigator from "../DrawerNav/DrawerNavigator";


const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerTitleStyle: { fontSize: 22 }
    }}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={DrawerNavigator}
      options={() => ({
        title: "Hello"
      })}
    />

    <Stack.Screen
      name="Барааны мэдээлэл"
      component={ProductScreen}
      options={{ headerShown: false }}
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
