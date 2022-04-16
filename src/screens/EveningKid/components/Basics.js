import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

/*
NOTE Key Points
1. Do not use state properties for animations (slow, run On JS thread)
2. Us Animated and Animated.Value
3. Update animated values over time with Animated.timing and use the native driver.
*/

const Basics = () => {
  // BUG this one only run in JS thread so NOT optimized
  //   const [translateX, setTranslateX] = useState(0);
  //   useEffect(() => {
  //     for (let i = 0; i < 100; i++) {
  //       setTimeout(() => {
  //         setTranslateX(i);
  //       }, 25 * i);
  //     }
  //   }, []);

  // NOTE Animated APi run in UI thread
  //   useRef returns a mutable obj whose current property to passed argument.
  // The returned object will persist for the full lifetime of component.
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // for (let i = 0; i < 100; i++) {
    //   setTimeout(() => {
    //     translateX.setValue(i);
    //   }, 25 * i);
    // }
    // NATIVE ANIMATIONS
    Animated.timing(translateX, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View>
      <Text style={styles.title}>1. Basics of Animations</Text>
      {/* <View style={[styles.box, {transform: [{translateX}]}]}>
        <Text>Basics</Text>
      </View> */}
      <Animated.View style={[styles.box, {transform: [{translateX}]}]}>
        <Text>Basics</Text>
      </Animated.View>
    </View>
  );
};

export default Basics;

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
