import React, {useRef, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import {Icon, Icons} from '../../components';

const FloatingActionButton = () => {
  const isOpen = useRef(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = isOpen.current ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    isOpen.current = !isOpen.current;
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  //   const opacity = {
  //     opacity: animation.interpolate({
  //       inputRange: [0, 0.5, 1],
  //       outputRange: [0, 0, 1],
  //     }),
  //   };

  //   const pinStyle = {
  //     transform: [
  //       {scale: animation},
  //       {
  //         translateY: animation.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: [0, -80],
  //         }),
  //       },
  //     ],
  //   };

  //   const animationStyle = useMemo(() => {
  //     return {
  //       transform: [
  //         {scale: animation},
  //         {
  //           translateY: animation.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [0, -80],
  //           }),
  //         },
  //       ],
  //     };
  //   }, [isOpen.current]);

  //   BEST APPROACH
  const animationStyleFn = (y = 80) => {
    return {
      opacity: animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
      }),
      transform: [
        {scale: animation},
        {
          translateY: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -y],
          }),
        },
      ],
    };
  };

  const animationStyleFnCB = useCallback(y => animationStyleFn(y), []);

  //   const animationStyleFnCB = useCallback((y = 80) => {
  //     return {
  //       opacity: animation.interpolate({
  //         inputRange: [0, 0.5, 1],
  //         outputRange: [0, 0, 1],
  //       }),
  //       transform: [
  //         {scale: animation},
  //         {
  //           translateY: animation.interpolate({
  //             inputRange: [0, 1],
  //             outputRange: [0, -y],
  //           }),
  //         },
  //       ],
  //     };
  //   }, []);

  return (
    <View style={styles.container}>
      <Text>RN FLOATING ACTION BUTTON</Text>

      {/* FLOATING BUTTON */}
      <View style={styles.btnCover}>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.btn, styles.secondary, animationStyleFnCB(200)]}>
            <Icon type={Icons.AntDesign} name="hearto" color="red" size={20} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            style={[styles.btn, styles.secondary, animationStyleFnCB(140)]}>
            <Icon type={Icons.Entypo} name="thumbs-up" color="red" size={20} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <Animated.View
            //style={[styles.btn, styles.secondary, animationStyleFn(), opacity]}>
            style={[styles.btn, styles.secondary, animationStyleFnCB()]}>
            <Icon
              type={Icons.Entypo}
              name="location-pin"
              color="red"
              size={20}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <Animated.View style={[styles.btn, styles.menu, rotation]}>
            <Icon type={Icons.AntDesign} name="plus" color="#fff" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default FloatingActionButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  //   FLOATING BUTTON
  btnCover: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 8,
  },
  btn: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    borderRadius: 30,
    shadowRadius: 10,
    shadowColor: 'red',
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
    position: 'absolute',
    bottom: 8,
    // alignSelf: 'center',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  menu: {
    backgroundColor: 'red',
  },
});
