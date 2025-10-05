/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MainNavigation from './navigation/MainNavigation';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { NavigationContainer } from '@react-navigation/native';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (

    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {/* <AppContent /> */}
          <MainNavigation />
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
