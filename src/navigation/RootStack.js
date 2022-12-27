import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  VictoryNative,
  CollapsingHeaderFooter,
  OnBoarding,
  ShimmerEffectPosts,
  HowToAnimated,
  PanAndScaleImage,
  BreathingApp,
  CountDownApp,
  FloatingActionButton,
  FloatingActionButton2,
  MagicLayout,
  TwoWayScrolling,
  TwoWayScrollingSync,
} from '../screens';
import {BottomTabOne, BottomTabTwo, BottomTabThree} from '../bottomTabs';
import {DrawerOne} from '../drawers';
import FormikYup from '../screens/FormikYup';
import MaskedViewSample from '../screens/Libraries/MaskedViewSample';

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
        name="DrawerOne"
        component={DrawerOne}
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
      {/* EVENTING KID ANIMATIONS */}
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
      {/* SCROLL ANIMATIONS */}
      <Stack.Screen
        name="TwoWayScrolling"
        component={TwoWayScrollingSync}
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
