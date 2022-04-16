import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

/**
 * 1. Interpolation is a way of estimating a function at intermediate points, learning from the ranges you provide.
 * 2. Interpolate animated values with (translateX || Value).interpolate. It maps an input range
 *    to values from an output range (numbers,colors,degrees)
 * 3. Extend or Clamp an output range on the left, right or both sides with extrapolation.
 * @returns
 */

const Interpolation = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateX2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    //   Animated.timing(translateX, {
    //     toValue: 100,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }).start();

    // Parallel
    // Animated.parallel([
    //   Animated.timing(translateX, {
    //     toValue: 100,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(translateX2, {
    //     toValue: 100,
    //     duration: 2000,
    //     // NOTE false => it runs in JS thread
    //     useNativeDriver: false,
    //   }),
    // ]).start();

    // Sequence with Parallel
    Animated.parallel([
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 100,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(translateX2, {
          toValue: 100,
          duration: 2000,
          // NOTE false => it runs in JS thread
          useNativeDriver: false,
        }),
        Animated.timing(translateX2, {
          toValue: 0,
          duration: 2000,
          // NOTE false => it runs in JS thread
          useNativeDriver: false,
        }),
      ]),
    ]).start();
  }, []);

  const opacity = translateX.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0.3, 1, 0.3],
  });
  //   const rotate = translateX.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: ['0deg', '360deg'],
  //   });
  const rotate = translateX.interpolate({
    inputRange: [25, 100],
    outputRange: ['0deg', '360deg'],
    // NOTE if Input Range start or end with other than regular
    // then extrapolate 'clamp' defined 0 0 and 100 100
    extrapolate: 'clamp',
    // extrapolate: 'identity',
  });

  const rotate2 = translateX2.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
  });
  const bgColor = translateX2.interpolate({
    inputRange: [0, 50, 100],
    outputRange: ['blue', 'green', 'red'],
  });

  return (
    <View>
      <Text style={styles.title}>3. Interpolation</Text>
      <Animated.View
        style={[styles.box, {transform: [{translateX}, {rotate}], opacity}]}>
        <Text>Interpolation</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{translateX: translateX2}, {rotate: rotate2}],
            backgroundColor: bgColor,
          },
        ]}>
        <Text style={{color: '#fff'}}>Interpolation (Native False)</Text>
      </Animated.View>
    </View>
  );
};

export default Interpolation;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
