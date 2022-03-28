import React, {useRef, useEffect} from 'react';
import {StyleSheet, Pressable, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import {
  ScreenOne,
  ScreenTwo,
  ScreenThree,
  ScreenFour,
} from '../screens/BottomTabScreens';
import Icon, {Icons} from '../components/Icons';
import Colors from '../constants/Colors';

const TabArr = [
  {
    route: 'ScreenOne',
    label: 'Home',
    type: Icons.Feather,
    icon: 'home',
    component: ScreenOne,
    color: Colors.primary,
    alphaClr: Colors.primaryAlpha,
  },
  {
    route: 'ScreenTwo',
    label: 'Search',
    type: Icons.Feather,
    icon: 'search',
    component: ScreenTwo,
    color: Colors.green,
    alphaClr: Colors.greenAlpha,
  },
  {
    route: 'ScreenThree',
    label: 'Add New',
    type: Icons.Feather,
    icon: 'plus-square',
    component: ScreenThree,
    color: Colors.red,
    alphaClr: Colors.redAlpha,
  },
  {
    route: 'ScreenFour',
    label: 'Account',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
    component: ScreenFour,
    color: Colors.purple,
    alphaClr: Colors.purpleAlpha,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const viewRef = useRef(null);
  const textViewRef = useRef(null);

  const {item, onPress, accessibilityState} = props;
  //   console.log(props);
  const focused = accessibilityState.selected;

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0},
        1: {scale: 1},
      });
      textViewRef.current.animate({
        0: {scale: 0},
        1: {scale: 1},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1},
        1: {scale: 0},
      });
      textViewRef.current.animate({
        0: {scale: 1},
        1: {scale: 0},
      });
    }
  }, [focused]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabBtn, {flex: focused ? 1 : 0.7}]}>
      <View>
        <Animatable.View
          ref={viewRef}
          style={[
            StyleSheet.absoluteFillObject,
            {backgroundColor: item.color, borderRadius: 16},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? null : item.alphaClr},
          ]}>
          <Icon
            type={item.type}
            name={item.icon}
            color={focused ? Colors.white : Colors.primary}
          />
          <Animatable.View ref={textViewRef}>
            {focused && <Text style={styles.btnText}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </Pressable>
  );
};

const BottomTabThree = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.container,
      }}>
      {TabArr.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.route}
          component={item.component}
          options={{
            title: item.label,
            tabBarShowLabel: false,
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabThree;

const styles = StyleSheet.create({
  container: {
    height: 60,
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 15,
    elevation: 1,
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
  btnText: {
    color: 'white',
    paddingHorizontal: 8,
  },
});
