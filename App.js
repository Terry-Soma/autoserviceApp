import 'react-native-gesture-handler';
import React from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation'
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
      <StatusBar style='light' />
      <Navigation />
    </PaperProvider>
  );
}
export default App;