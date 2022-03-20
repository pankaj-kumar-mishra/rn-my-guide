import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, useColorScheme, StatusBar} from 'react-native';
import Colors from './src/constants/Colors';
import RootStack from './src/navigation/RootStack';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const safeViewStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <SafeAreaView style={safeViewStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.white}
      />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
