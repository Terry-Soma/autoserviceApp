import 'react-native-gesture-handler';
import React, { useCallback } from 'react';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigation'
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { View } from 'react-native';
import { fontOptions } from './Constants';
SplashScreen.preventAutoHideAsync();
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
  const [fontsLoaded] = useFonts(fontOptions);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <PaperProvider theme={theme} >
      <StatusBar style='light' />
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Navigation onLayoutRootView={onLayoutRootView} />
      </View>
    </PaperProvider>
  );
}
export default App;