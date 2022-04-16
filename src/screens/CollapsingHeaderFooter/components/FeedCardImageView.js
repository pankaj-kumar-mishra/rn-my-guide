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

const pointsDistance = ([xA, yA], [xB, yB]) => {
  return Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
};

const FeedCardImageView = ({item}) => {
  const pan = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const scale = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const activeTouches = evt.nativeEvent.changedTouches.length;
        if (activeTouches === 1) {
          // handle move
          //   console.log('move');
          pan.setValue({
            x: gestureState.dx,
            y: gestureState.dy,
          });
        } else if (activeTouches === 2) {
          // handle scale/zoom
          //   console.log('scale');
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
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <Animated.Image
        {...panResponder.panHandlers}
        source={{uri: item.pic}}
        style={[
          styles.pic,
          {transform: [{translateX: pan.x}, {translateY: pan.y}, {scale}]},
        ]}
      />
    </View>
  );
};

export default FeedCardImageView;

const styles = StyleSheet.create({
  card: {
    height: 300,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 10,
    marginHorizontal: '4%',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  desc: {
    fontSize: 14,
    color: '#888',
  },
  pic: {
    // flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});
