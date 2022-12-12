import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useColorScheme, StatusBar, Platform, UIManager} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';
import {enableFreeze} from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Colors from './src/constants/Colors';
import RootStack from './src/navigation/RootStack';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

enableFreeze(true);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }, []);

  const safeViewStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={safeViewStyle}>
        <NativeBaseProvider>
          <PaperProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={Colors.white}
            />
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </PaperProvider>
        </NativeBaseProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
