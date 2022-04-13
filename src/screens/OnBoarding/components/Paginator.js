import React from 'react';
import {StyleSheet, View, Animated, useWindowDimensions} from 'react-native';

const Paginator = ({data, scrollX}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((dot, idx) => {
        {
          /* Previous Dot, Current Dot, Next Dot */
        }
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const dotOpacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[styles.dot, {width: dotWidth, opacity: dotOpacity}]}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
    marginHorizontal: 8,
  },
});
