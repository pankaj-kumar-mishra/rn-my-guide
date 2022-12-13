import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import {Icon, Icons} from '../../../components';

const size = 128;
const strokeWidth = 2;
const center = size / 2;
const radius = size / 2 - strokeWidth / 2;
const circumference = 2 * Math.PI * radius;

const NextCircleBtn = ({percentage, handleNext}) => {
  const progressRef = useRef(null);
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const animation = toValue => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke="#eee"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke="maroon"
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            //strokeDashoffset={circumference - (circumference * 25) / 100}
          />
        </G>
      </Svg>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleNext}
        style={styles.button}>
        <Icon type={Icons.AntDesign} name="arrowright" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default NextCircleBtn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'maroon',
    position: 'absolute',
    padding: 20,
    borderRadius: 100,
  },
});
