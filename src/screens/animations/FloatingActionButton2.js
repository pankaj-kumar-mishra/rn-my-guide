import React, {useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Icon, {Icons} from '../../components/Icons';
const {width} = Dimensions.get('screen');

const FAB_SIZE = 54;
const circleScale = (width / FAB_SIZE).toFixed(1);
const circleSize = circleScale * FAB_SIZE;
// const distance = circleSize / 2;
const distance = circleSize / 2 - FAB_SIZE;
const middleDistance = distance / 1.41;

const ActionButton = ({icon, style, onPress}) => {
  return (
    <Animated.View style={[styles.actionBtn, style]}>
      <TouchableOpacity
        activeOpacity={0.8}
        //style={styles.actionBtn}
        onPress={onPress}>
        <Icon type={Icons.EvilIcons} name={icon} size={34} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const FloatingActionButton2 = () => {
  const [open, toggle] = useReducer(s => !s, false);
  //   console.log(open);

  const rotation = useDerivedValue(() => {
    return withTiming(open ? '0deg' : '135deg');
  }, [open]);
  const progress = useDerivedValue(() => {
    return open ? withSpring(1) : withSpring(0);
  }, [open]);
  const translation = useDerivedValue(() => {
    return open ? withSpring(1, {stiffness: 80, damping: 8}) : withSpring(0);
  }, [open]);

  const fabStyles = useAnimatedStyle(() => {
    const rotate = rotation.value;
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['red', 'maroon'],
    );
    return {transform: [{rotate}], backgroundColor};
  }, []);

  const expandingStyles = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, circleScale]); // 8
    return {transform: [{scale}]};
  }, []);

  const actionBtnStyles = (x, y, value) => {
    return useAnimatedStyle(() => {
      // progress.value also work, here we use translation.value for visible spring effect
      const translate = interpolate(translation.value, [0, 1], [0, -value], {
        extrapolateLeft: Extrapolate.CLAMP,
      });
      const scale = interpolate(progress.value, [0, 1], [0, 1], {
        extrapolateLeft: Extrapolate.CLAMP,
      });

      if (x & y) {
        return {
          transform: [
            {translateX: translate},
            {translateY: translate},
            {scale},
          ],
        };
      } else if (x) {
        return {
          transform: [{translateX: translate}, {scale}],
        };
      } else if (y) {
        return {
          transform: [{translateY: translate}, {scale}],
        };
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>RN FLOATING ACTION BUTTON TWO</Text>

      <View style={styles.fabContainer}>
        <Animated.View style={[styles.expandingCircle, expandingStyles]} />
        <ActionButton
          style={actionBtnStyles(false, true, distance)}
          icon="calendar"
        />
        <ActionButton
          style={actionBtnStyles(true, true, middleDistance)}
          icon="share-google"
        />
        <ActionButton
          style={actionBtnStyles(true, false, distance)}
          icon="gear"
        />

        <TouchableWithoutFeedback onPress={toggle}>
          <Animated.View style={[styles.fab, fabStyles]}>
            <Icon type={Icons.EvilIcons} name="close" color="#fff" size={34} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const CircleStyle = {
  width: FAB_SIZE,
  height: FAB_SIZE,
  borderRadius: FAB_SIZE / 2,
  alignItems: 'center',
  justifyContent: 'center',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 30,
    color: 'goldenrod',
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab: {
    ...CircleStyle,
    backgroundColor: 'red',
    // rotate fab to 45deg/135deg to show as plus (close icon => plus icon)
    //transform: [{rotate: '135deg'}],
  },
  expandingCircle: {
    ...CircleStyle,
    backgroundColor: 'red',
    //transform: [{scale: 8}],
    position: 'absolute',
    zIndex: -1,
  },
  actionBtn: {
    ...CircleStyle,
    backgroundColor: 'maroon',
    position: 'absolute',
    zIndex: -1,
    //transform: [{translateX: -150}],
  },
});

export default FloatingActionButton2;
