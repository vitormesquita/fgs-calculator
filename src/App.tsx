import '../global.css';

import { DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { RootStack } from './navigation';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';
import { Asset } from 'expo-asset';
import { Assets as NavigationAssets } from '@react-navigation/elements';

Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);

SplashScreen.preventAutoHideAsync();

export function App() {

  const onLayout = useCallback(async() => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <NavigationContainer theme={appTheme}> 
      <View style={styles.navigationLayout} onLayout={onLayout}>
        <RootStack />
      </View>      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigationLayout: {
    flex: 1,
  },
});

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#f5f5f5',
  },
};
