import React from 'react';
import {StyleSheet, Text, View, Image, useWindowDimensions} from 'react-native';

const OnBoardingItem = ({item}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width}]} />
      {/* flex .7+.3 = 1 */}
      <View style={styles.textView}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 0.7,
    resizeMode: 'contain',
  },
  textView: {flex: 0.3, justifyContent: 'center'},
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    fontWeight: '400',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 100,
  },
});
