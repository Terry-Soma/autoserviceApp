import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import ProductScreen from "../screens/ProductScreen";
import DrawerNavigator from './DrawerNavigator'
import { appbarColor } from "../../Constants";
import ManagePhoneInfoScreen from "../screens/ManagePhoneInfo";

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator screenOptions={{
    headerStyle: { backgroundColor: appbarColor },
    headerTintColor: '#FFF',
    headerTitleStyle: { fontWeight: "600", fontSize: 18 }
  }}>
    <Stack.Screen
      name="Drawer"
      component={DrawerNavigator}
      options={{
        headerShown: false
      }}
    />
    {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
    <Stack.Screen
      name="ProductDetail"
      component={ProductScreen}
      options={({ route, navigation }) => ({ title: route.params.product?.ner })}
      screenOptions={{ headerMode: 'screen' }}
    />
    <Stack.Screen
      name="ManagePhoneInfo"
      component={ManagePhoneInfoScreen}
    // screenOptions={{ headerMode: 'screen' }}
    />

    {/* </Stack.Group> */}
  </Stack.Navigator>
);
