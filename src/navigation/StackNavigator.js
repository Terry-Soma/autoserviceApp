import React, { useContext } from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import ProductScreen from "../screens/ProductScreen";
import DrawerNavigator from './DrawerNavigator'
import { appbarColor, headerTitleStyle } from "../../Constants";
import ManagePhoneInfoScreen from "../screens/ManagePhoneInfo";
import LoginScreen from "../screens/LoginScreen";
import UserContext from './../context/userContext'
import CategoryProductsScreen from "../screens/CategoryProductsScreen";
import AddCategory from "../screens/AddCategory";
import ManageProduct from "../screens/ManageProduct";
const Stack = createStackNavigator();

export default () => {
  const userState = useContext(UserContext);


  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: appbarColor },
      headerTintColor: '#FFF',
      headerTitleStyle: headerTitleStyle,
    }}
    >
      {/* conditional route */}
      {userState.isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
              headerShown: false
            }}
          />
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
          <Stack.Screen
            name="AddCategory"
            component={AddCategory}
          // screenOptions={{ headerMode: 'screen' }}
          />
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProductsScreen}
            options={({ route, navigation }) => ({ title: route.params.category?.ner })}
          // screenOptions={{ headerMode: 'screen' }}
          />
          <Stack.Screen
            name="ManageProduct"
            component={ManageProduct}
            options={({ route, navigation }) => ({ title: route.params.product?.ner })}
          // screenOptions={{ headerMode: 'screen' }}
          />
        </Stack.Group>
      ) :
        (<Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Бүртгэлийн хуудас", headerTitleAlign: "center" }}
        />)}




      {/* </Stack.Group> */}
    </Stack.Navigator>
  );
}
