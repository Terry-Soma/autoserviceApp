import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View , Button, Alert} from 'react-native';

import DrawerNav from './src/DrawerNav/DrawerNavigator';
// import {
//   createStackNavigator,
//   HeaderBackButton
// } from "@react-navigation/native-stack";

// function HomeScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button title="Go" onPress={()=> navigation.navigate('Details') } />
//     </View>
//   );
// }
// const Drawer = createDrawerNavigator();
// function DetailsScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text onPress={()=>navigation.toggleDrawer()}>Details Screen</Text>
//     </View>
//   );
// }
 const App= ()=> {
  return (
    <NavigationContainer>
     <DrawerNav/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;