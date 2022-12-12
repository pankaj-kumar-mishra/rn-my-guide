import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, Animated} from 'react-native';
import AnimationTypes from './components/AnimationTypes';
import BasicGestures from './components/BasicGestures';
import Basics from './components/Basics';
import Interpolation from './components/Interpolation';

/**
 * 1. onScroll gives information on the current scrolling position and other indicators (content offset, size...)
 * 2. To change an animated value based on a scrolling event, we use Animated.event with onScroll
 * 3. It needs a mapping of the event with the corresponding animated values, that will be changed
 * when event is fired.
 */

const HEADER_HEIGHT = 80;
const HowToAnimated = () => {
  //   const [headerShown, setHeaderShown] = useState(false);
  //   const translateY = useRef(new Animated.Value(-HEADER_HEIGHT)).current;
  const scrollingY = useRef(new Animated.Value(0)).current;

  //   useEffect(() => {
  //     Animated.timing(translateY, {
  //       toValue: headerShown ? 0 : -HEADER_HEIGHT,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   }, [headerShown]);

  const translateY = scrollingY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 50],
    outputRange: [-HEADER_HEIGHT, 0],
    extrapolate: 'clamp',
  });
  const opacity = scrollingY.interpolate({
    inputRange: [HEADER_HEIGHT, HEADER_HEIGHT + 50],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      {/* <View
        style={[
          styles.header,
          {transform: [{translateY: headerShown ? 0 : -HEADER_HEIGHT}]},
        ]}>
        <Text style={styles.headerText}>APP HEADER</Text>
      </View> */}

      <Animated.View
        style={[styles.header, {transform: [{translateY}], opacity}]}>
        <Text style={styles.headerText}>APP HEADER</Text>
      </Animated.View>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        onScroll={evt => {
          const scrollingY = evt.nativeEvent.contentOffset.y;
          if (scrollingY > HEADER_HEIGHT) {
            setHeaderShown(true);
          } else {
            setHeaderShown(false);
          }
        }}
        scrollEventThrottle={16}> */}
      {/* BETTER APPROACH */}
      <Animated.ScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollingY}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        {/* 5. BASICS OF GESTURES */}
        <BasicGestures />
        {/* 4. ANIMATED EVENTS WITH SCROLL VIEWS */}
        {/* NOTE CURRENT SCREEN uncomment below view to see result( 200 to 1000) */}
        <View style={{height: 200}}>
          <Text style={styles.title}>4. Animated events with ScrollViews</Text>
        </View>
        {/*3. INTERPOLATION */}
        <Interpolation />
        {/*2. ANIMATIONS TYPES */}
        <AnimationTypes />
        {/*1. THE BASICS OF ANIMATIONS */}
        <Basics />
      </Animated.ScrollView>
    </View>
  );
};

export default HowToAnimated;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: 'gold',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
});
