import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DrawerNav from './src/DrawerNav/DrawerNavigator';
import StackNavigator from './src/StackNav/StackNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',


  },
};
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* <StackNavigator />
        ymar negen routes iig yvuulna
        
        */}
        <DrawerNav />
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;