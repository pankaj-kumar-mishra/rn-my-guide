import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('screen');

const IMAGE_URI =
  'https://vignette.wikia.nocookie.net/joke-battles/images/4/40/18360-doge-doge-simple.jpg/revision/latest?cb=20151209161638';

const pointsDistance = ([xA, yA], [xB, yB]) => {
  return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
};

/**
 * 1. A Pan Responder is a wrapper around View Responder props, that reconciles several touches in to a single gesture.
 * 2. In addition to regular responder props, it computes a gesture state by averaging touch positions (centroids)
 * 3. It returns a panHandlers property which has to be spread on the element that should become interactive.
 * @returns
 */

const PanAndScaleImage = () => {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const activeTouches = evt.nativeEvent.changedTouches.length;
        if (activeTouches === 1) {
          // handle move
          console.log('move');
          pan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
        } else if (activeTouches === 2) {
          // handle scale/zoom
          console.log('scale');
          const touches = evt.nativeEvent.changedTouches;
          const touchA = touches[0];
          const touchB = touches[1];
          const distance = pointsDistance(
            [touchA.pageX, touchA.pageY],
            [touchB.pageX, touchB.pageY],
          );

          const screenMovePercents = distance / width;
          //   scale.setValue(1 + screenMovePercents);
          scale.setValue(1 + screenMovePercents * 3);
        } else {
          console.log('More than 2 touches');
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.Image
        {...panResponder.panHandlers}
        source={{uri: IMAGE_URI}}
        style={[
          styles.image,
          // we can also write for same pan.getTranslateTransform()
          //{transform: pan.getTranslateTransform()}
          {transform: [{translateX: pan.x}, {translateY: pan.y}, {scale}]},
        ]}
      />
    </View>
  );
};

export default PanAndScaleImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    width: '90%',
    borderRadius: 10,
    // alignSelf: 'center',
  },
});
