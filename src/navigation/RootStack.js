import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import BottomTabOne from '../bottomTabs/BottomTabOne';
import BottomTabTwo from '../bottomTabs/BottomTabTwo';
import BottomTabThree from '../bottomTabs/BottomTabThree';
import FormikYup from '../screens/FormikYup';
import MagicLayout from '../screens/animations/MagicLayout';
import CountDownApp from '../screens/animations/CountDownApp';
import BreathingApp from '../screens/animations/BreathingApp';
import FloatingActionButton from '../screens/animations/FloatingActionButton';
import FloatingActionButton2 from '../screens/animations/FloatingActionButton2';
import OnBoarding from '../screens/OnBoarding';
import MaskedViewSample from '../screens/Libraries/MaskedViewSample';
import VictoryNative from '../screens/VictoryNative';
import ShimmerEffectPosts from '../screens/ShimmerEffectPosts';
import CollapsingHeaderFooter from '../screens/CollapsingHeaderFooter';
import HowToAnimated from '../screens/EveningKid/HowToAnimated';
import PanAndScaleImage from '../screens/EveningKid/PanAndScaleImage';

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

      <Stack.Screen
        name="CollapsingHeaderFooter"
        component={CollapsingHeaderFooter}
        options={{headerShown: false}}
      />

      {/* OTHER PACKAGES */}
      <Stack.Screen
        name="FormikYup"
        component={FormikYup}
        options={{
          title: 'Formik Yup - Validation',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MaskedView"
        component={MaskedViewSample}
        options={{
          title: 'Masked View',
          headerTitleAlign: 'center',
        }}
      />

      {/* ANIMATIONS */}
      {/* EVENTING KID */}
      <Stack.Screen
        name="HowToAnimated"
        component={HowToAnimated}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PanAndScaleImage"
        component={PanAndScaleImage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MagicLayout"
        component={MagicLayout}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CountDownApp"
        component={CountDownApp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BreathingApp"
        component={BreathingApp}
        options={{
          headerShown: false,
        }}
      />

      {/* FAB */}
      <Stack.Screen
        name="FloatingActionButton"
        component={FloatingActionButton}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FloatingActionButton2"
        component={FloatingActionButton2}
        options={{
          headerShown: false,
        }}
      />

      {/* ON BOARDING */}
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{
          headerShown: false,
        }}
      />

      {/* CHARTS/GRAPHS VICTORY NATIVE */}
      <Stack.Screen
        name="VictoryNative"
        component={VictoryNative}
        options={{
          headerShown: false,
        }}
      />

      {/* OPTIMIZATION ABSTRACTION */}
      <Stack.Screen
        name="ShimmerEffectPosts"
        component={ShimmerEffectPosts}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
