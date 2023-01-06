import React, {useRef} from 'react';
import {View, StyleSheet, Animated, Pressable, Text} from 'react-native';

const Basics = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  //   const animateBox = useRef(
  //     Animated.timing(animatedValue, {
  //       toValue: 1,
  //       useNativeDriver: false,
  //       duration: 3000,
  //     }),
  //   ).current;
  const animateBox = useRef(
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        useNativeDriver: false,
        duration: 3000,
      }),
    ),
  ).current;

  const animateStart = () => {
    animateBox.start();
  };
  const animateStop = () => {
    animateBox.stop();
  };
  const animateReset = () => {
    animateBox.reset();
    animatedValue.setValue(0);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    box: {
      //   width: animatedValue.interpolate({
      //     inputRange: [0, 1],
      //     outputRange: ['30%', '70%'],
      //   }),
      //   height: animatedValue.interpolate({
      //     inputRange: [0, 1],
      //     outputRange: [100, 250],
      //   }),
      width: animatedValue.interpolate({
        inputRange: [0, 0.75, 1],
        outputRange: ['30%', '70%', '30%'],
      }),
      height: animatedValue.interpolate({
        inputRange: [0, 0.75, 1],
        outputRange: [100, 250, 100],
      }),
      backgroundColor: animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['#000', '#0f0', '#f00'],
      }),
      borderRadius: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 100],
      }),
      alignSelf: 'center',
      marginTop: 50,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    position: {
      position: 'absolute',
      bottom: 50,
      left: 0,
      right: 0,
    },
    btn: {
      width: 'auto',
      height: 30,
      backgroundColor: 'goldenrod',
      padding: 5,
      borderRadius: 5,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={styles.box} />

      <View style={styles.position}>
        <View style={styles.row}>
          <Pressable onPress={animateStart} style={styles.btn}>
            <Text>Start</Text>
          </Pressable>
          <Pressable onPress={animateStop} style={styles.btn}>
            <Text>Stop</Text>
          </Pressable>
          <Pressable onPress={animateReset} style={styles.btn}>
            <Text>Reset</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Basics;
