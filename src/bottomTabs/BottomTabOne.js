import React, {useRef, useEffect} from 'react';
import {StyleSheet, Pressable} from 'react-native';
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
    label: 'Screen One',
    type: Icons.Ionicons,
    activeIcon: 'grid',
    inActiveIcon: 'grid-outline',
    component: ScreenOne,
  },
  {
    route: 'ScreenTwo',
    label: 'Screen Two',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'heart-plus',
    inActiveIcon: 'heart-plus-outline',
    component: ScreenTwo,
  },
  {
    route: 'ScreenThree',
    label: 'Screen Three',
    type: Icons.MaterialCommunityIcons,
    activeIcon: 'timeline-plus',
    inActiveIcon: 'timeline-plus-outline',
    component: ScreenThree,
  },
  {
    route: 'ScreenFour',
    label: 'Screen Four',
    type: Icons.FontAwesome,
    activeIcon: 'user-circle',
    inActiveIcon: 'user-circle-o',
    component: ScreenFour,
  },
];

const Tab = createBottomTabNavigator();

const TabButton = props => {
  const viewRef = useRef(null);

  const {item, onPress, accessibilityState} = props;
  //   console.log(props);
  const focused = accessibilityState.selected;

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: {scale: 0.8, rotate: '0deg'},
        1: {scale: 1.5, rotate: '360deg'},
      });
    } else {
      viewRef.current.animate({
        0: {scale: 1.5, rotate: '360deg'},
        1: {scale: 1, rotate: '0deg'},
      });
    }
  }, [focused]);

  return (
    <Pressable onPress={onPress} style={styles.tabBtn}>
      <Animatable.View ref={viewRef} duration={1000}>
        <Icon
          name={focused ? item.activeIcon : item.inActiveIcon}
          type={item.type}
          color={focused ? Colors.primary : Colors.primaryLite}
          //size={size}
        />
      </Animatable.View>
    </Pressable>
  );
};

const BottomTabOne = () => {
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

export default BottomTabOne;

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
