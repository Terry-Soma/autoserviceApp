import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import DrawerNav from './src/DrawerNav/DrawerNavigator';
import { StatusBar } from 'expo-status-bar';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#F1C40F',
    mainColor: '#3498DB',
    textColor: "#05375a",
    secondaryColor: '#FFFFFF',
    accentColors: [
      '#2C3E50',
      '#F1C40F',
      '#E67E22',
      '#27AE60',
      '#9B59B6',
      '#2980B9',
      '#E74C3C',
      '#34495E'
    ],
  },
};
const App = () => {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <StatusBar />
        <DrawerNav />
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;