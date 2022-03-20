import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import BottomTabOne from '../bottomTabs/BottomTabOne';
import BottomTabTwo from '../bottomTabs/BottomTabTwo';
import BottomTabThree from '../bottomTabs/BottomTabThree';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="BTone"
        component={BottomTabOne}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BTtwo"
        component={BottomTabTwo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BTthree"
        component={BottomTabThree}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
