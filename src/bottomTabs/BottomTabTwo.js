import React, {useRef, useEffect} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Animatable from 'react-native-animatable';
import {
  ScreenOne,
  ScreenTwo,
  ScreenThree,
  ScreenFour,
  ScreenFive,
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
  },
  {
    route: 'ScreenTwo',
    label: 'Search',
    type: Icons.Feather,
    icon: 'search',
    component: ScreenTwo,
  },
  {
    route: 'ScreenThree',
    label: 'Add',
    type: Icons.Feather,
    icon: 'plus-square',
    component: ScreenThree,
  },
  {
    route: 'ScreenFour',
    label: 'Like',
    type: Icons.Feather,
    icon: 'heart',
    component: ScreenFour,
  },
  {
    route: 'ScreenFive',
    label: 'Profile',
    type: Icons.FontAwesome,
    icon: 'user-circle-o',
    component: ScreenFive,
  },
];

const Tab = createBottomTabNavigator();

const viewAnimate1 = {
  0: {scale: 1, translateY: 8},
  0.9: {translateY: -40},
  1: {scale: 1.2, translateY: -24},
};
const viewAnimate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 6},
};
const circleAnimate1 = {
  0: {scale: 0},
  0.2: {scale: 0.6},
  0.5: {scale: 0.3},
  1: {scale: 1},
};
const circleAnimate2 = {
  0: {scale: 1},
  1: {scale: 0},
};

const TabButton = props => {
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  const {item, onPress, accessibilityState} = props;
  //   console.log(props);
  const focused = accessibilityState.selected;

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(viewAnimate1);
      circleRef.current.animate(circleAnimate1);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(viewAnimate2);
      circleRef.current.animate(circleAnimate2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  return (
    <Pressable onPress={onPress} style={styles.tabBtn}>
      <Animatable.View ref={viewRef} duration={800}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef}
            duration={800}
            style={styles.blueCircle}
          />
          <Icon
            name={item.icon}
            type={item.type}
            color={focused ? Colors.white : Colors.primary}
            //size={24}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.btnText}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </Pressable>
  );
};

const BottomTabTwo = () => {
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
            //tabBarIcon: ({focused, color, size}) => (
            //  <Icon
            //    name={focused ? item.activeIcon : item.inActiveIcon}
            //    type={item.type}
            //    color={color}
            //    size={size}
            //  />
            //),
            tabBarButton: props => <TabButton {...props} item={item} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabTwo;

const styles = StyleSheet.create({
  container: {
    height: 70,
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    borderRadius: 15,
    elevation: 1,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueCircle: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.primary,
    borderRadius: 25,
  },
  btnText: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.primary,
  },
});
