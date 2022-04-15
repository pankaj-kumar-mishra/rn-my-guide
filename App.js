import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
  StatusBar,
  Platform,
  UIManager,
} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import {Provider as PaperProvider} from 'react-native-paper';
import {enableFreeze} from 'react-native-screens';
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

  const safeViewStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <NativeBaseProvider>
      <PaperProvider>
        <SafeAreaView style={safeViewStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={Colors.white}
          />
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </NativeBaseProvider>
  );
};

export default App;
