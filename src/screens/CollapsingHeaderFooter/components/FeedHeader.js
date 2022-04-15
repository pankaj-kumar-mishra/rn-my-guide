import {StyleSheet, Text, Animated} from 'react-native';
import React from 'react';

const FeedHeader = ({title, style}) => {
  return (
    <Animated.View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: '4%',
    justifyContent: 'center',
    backgroundColor: 'gold',
    elevation: 10,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '800',
  },
});
