import {HStack} from 'native-base';
import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, View, Animated, Easing} from 'react-native';

/**
 * 1. Animated.timing and Animated.spring work for most use cases. Animation can be delayed or have a duration.
 * 2. Timed animations use easing functions to know how to animate a value over time (ease-in-out, linear etc...)
 * 3. Use Animated.sequence, Animated.parallel, Animated.stagger to compose animations.
 * @returns
 */

const AnimationTypes = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const translate2 = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animated.timing(translateX, {
    //     toValue: 100,
    //     // delay: 1000,
    //     // duration: 1000,
    //     //   Follow documentation for better understanding on Easing
    //     easing: Easing.bounce,
    //     useNativeDriver: true,
    //   }).start();
    //   Animated.spring(translateX, {
    //     toValue: 0,
    //     useNativeDriver: true,
    //   }).start();

    // ANIMATION COMPOSITION
    Animated.sequence([
      Animated.timing(translateX, {
        toValue: 100,
        duration: 2000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.spring(translateX, {
        toValue: 55,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Sequence
    Animated.sequence([
      Animated.timing(translate.x, {
        toValue: 105,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translate.y, {
        toValue: -100,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Parallel
    Animated.parallel([
      Animated.timing(translate2.x, {
        toValue: -100,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translate2.y, {
        toValue: -100,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    // Stagger
    // Animated.stagger(1000, [
    //   Animated.timing(opacity1, {
    //     toValue: 1,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(opacity2, {
    //     toValue: 1,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(opacity3, {
    //     toValue: 1,
    //     useNativeDriver: true,
    //   }),
    // ]).start();

    // Sequence with Stagger
    Animated.sequence([
      Animated.stagger(500, [
        Animated.timing(opacity1, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(500, [
        Animated.timing(opacity1, {
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(opacity2, {
          toValue: 0.3,
          useNativeDriver: true,
        }),
        Animated.timing(opacity3, {
          toValue: 0.3,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <View>
      <Text style={styles.title}>2. Animation Types</Text>
      <Animated.View style={[styles.box, {transform: [{translateX}]}]}>
        <Text>Animation Types</Text>
      </Animated.View>
      <HStack>
        <Animated.View
          style={[
            styles.box,
            {transform: [{translateX: translate.x}, {translateY: translate.y}]},
          ]}>
          <Text>Composition Sequence</Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                {translateX: translate2.x},
                {translateY: translate2.y},
              ],
            },
          ]}>
          <Text>Composition Parallel</Text>
        </Animated.View>
      </HStack>
      {/* STAGGER */}
      <Animated.View style={[styles.box2, {opacity: opacity1}]}>
        <Text>Composition Stagger One</Text>
      </Animated.View>
      <Animated.View style={[styles.box2, {opacity: opacity2}]}>
        <Text>Composition Stagger Two</Text>
      </Animated.View>
      <Animated.View style={[styles.box2, {opacity: opacity3}]}>
        <Text>Composition Stagger Three</Text>
      </Animated.View>
    </View>
  );
};

export default AnimationTypes;

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
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'goldenrod',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
});
