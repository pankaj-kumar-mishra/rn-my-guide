import React, {useRef} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

import placeholderImg from '../../../assets/images/image-placeholder.png';

const ProgressiveImage = ({
  defaultImg = placeholderImg,
  actualImg,
  style,
  ...props
}) => {
  const defaultImgAnimated = useRef(new Animated.Value(0)).current;
  const actualImgAnimated = useRef(new Animated.Value(0)).current;

  const handleDefaultImgLoad = () => {
    // console.log('Called Default');
    Animated.timing(defaultImgAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleActualImgLoad = () => {
    // console.log('Called Actual');
    Animated.timing(actualImgAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        {...props}
        source={defaultImg}
        style={[
          style,
          {
            opacity: defaultImgAnimated,
            transform: [{scale: defaultImgAnimated}],
          },
        ]}
        onLoad={handleDefaultImgLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...props}
        source={{uri: actualImg}}
        style={[
          style,
          {opacity: actualImgAnimated, transform: [{scale: actualImgAnimated}]},
          styles.imageOverlay,
        ]}
        onLoad={handleActualImgLoad}
      />
    </View>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
