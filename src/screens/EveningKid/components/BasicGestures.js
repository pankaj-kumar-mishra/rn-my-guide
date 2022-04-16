import React, {useRef} from 'react';
import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';

const {width, height} = Dimensions.get('screen');

/**
 * 1. A gesture responder in React Native is in charge of gestures and needs to be talked to for an element to become interactive.
 * 2. Every View can use its properties to tell the responder when and how it should turn interactive (      onMoveShouldSetResponder, onResponderMove…).
 * 3. These properties are useful to define side-effects based on a gesture, namely when it starts, moves and ends.
 * pageX: The X position of the touch, relative to the root element.
    pageY: The Y position of the touch, relative to the root element.
    locationX: The X position of the touch, relative to the element.
    locationY: The Y position of the touch, relative to the element.
 */

const CURSOR_SIZE = 30;
const VIEW_HEIGHT = 300;
const BasicGestures = () => {
  // BUG   DISABLE SCROLL VIEW to view Result
  // const touch = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const touch = useRef(
    new Animated.ValueXY({x: width / 2 + CURSOR_SIZE / 2, y: VIEW_HEIGHT / 2}),
  ).current;

  const left = Animated.subtract(touch.x, CURSOR_SIZE / 2);
  const top = Animated.subtract(touch.y, CURSOR_SIZE / 2);

  return (
    <>
      {/* <View
      style={{height: VIEW_HEIGHT, width}}
      onStartShouldSetResponder={() => true}
      //onMoveShouldSetResponder={() => true}
      onResponderMove={evt => {
        touch.setValue({
          x: evt.nativeEvent.locationX,
          y: evt.nativeEvent.locationY,
        });
      }}
      onResponderRelease={evt => {
        Animated.spring(touch, {
          toValue: {
            x: width / 2 - CURSOR_SIZE / 2,
            y: VIEW_HEIGHT / 2,
          },
          // left top are not supported by native driver
          useNativeDriver: false,
        }).start();
      }}>
      <Text style={styles.title}>5. Basics of Gestures</Text>

      <Animated.View style={[styles.dot, {left, top}]} />
    </View> */}
      <View style={{height: VIEW_HEIGHT}}>
        <Text style={styles.title}>5. Basics of Gestures</Text>

        <Animated.View
          style={[styles.dot, {left, top}]}
          onStartShouldSetResponder={() => true}
          //onMoveShouldSetResponder={() => true}
          onResponderMove={evt => {
            touch.setValue({
              x: evt.nativeEvent.locationX,
              y: evt.nativeEvent.locationY,
            });
          }}
          onResponderRelease={evt => {
            Animated.spring(touch, {
              toValue: {
                x: width / 2 - CURSOR_SIZE / 2,
                y: VIEW_HEIGHT / 2,
              },
              // left top are not supported by native driver
              useNativeDriver: false,
            }).start();
          }}
        />
      </View>
    </>
  );
};

export default BasicGestures;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  dot: {
    width: CURSOR_SIZE,
    height: CURSOR_SIZE,
    borderRadius: CURSOR_SIZE / 2,
    backgroundColor: 'gold',
    position: 'absolute',
    // left and top will handled by touch.x and touch.y
    // left: width / 2 - CURSOR_SIZE / 2,
    // top: VIEW_HEIGHT / 2,
  },
});
