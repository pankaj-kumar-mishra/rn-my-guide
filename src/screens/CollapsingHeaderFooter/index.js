import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';
import FeedCard from './components/FeedCard';
import FeedCardImageView from './components/FeedCardImageView';
import FeedHeader from './components/FeedHeader';

import feedData from './data';

export const HEADER_HEIGHT = 50;

const CollapsingHeaderFooter = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const offsetAnimate = useRef(new Animated.Value(0)).current;

  const clampedScroll = Animated.diffClamp(
    Animated.add(
      scrollY.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolateLeft: 'clamp',
      }),
      offsetAnimate,
    ),
    0,
    HEADER_HEIGHT,
  );

  let _clampedScrollValue = 0;
  let _offsetValue = 0;
  let _scrollValue = 0;

  useEffect(() => {
    scrollY.addListener(({value}) => {
      const diff = value - _scrollValue;
      _scrollValue = value;
      _clampedScrollValue = Math.min(
        Math.max(_clampedScrollValue * diff, 0),
        HEADER_HEIGHT,
      );
    });
    offsetAnimate.addListener(({value}) => {
      _offsetValue = value;
    });

    return () => {
      scrollY.removeAllListeners();
      offsetAnimate.removeAllListeners();
    };
  }, []);

  let scrollEndTimer = null;
  const onMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };
  const onMomentumScrollEnd = () => {
    const toValue =
      _scrollValue > HEADER_HEIGHT && _clampedScrollValue > HEADER_HEIGHT / 2
        ? _offsetValue + HEADER_HEIGHT
        : _offsetValue - HEADER_HEIGHT;

    Animated.timing(offsetAnimate, {
      toValue,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  const onScrollEndDrag = () => {
    scrollEndTimer = setTimeout(onMomentumScrollEnd, 250);
  };

  const headerTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  const footerTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, HEADER_HEIGHT * 2],
    extrapolate: 'clamp',
  });
  const opacity = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={feedData}
        keyExtractor={({id}) => id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        //renderItem={({item}) => <FeedCard item={item} />}
        renderItem={({item}) => <FeedCardImageView item={item} />}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
        scrollEventThrottle={16}
      />
      <Animated.View
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <FeedHeader title="Feed (Header)" style={{opacity}} />
      </Animated.View>
      <Animated.View
        style={[styles.footer, {transform: [{translateY: footerTranslate}]}]}>
        <FeedHeader title="Bottom Tab (Footer)" style={{opacity}} />
      </Animated.View>
    </View>
  );
};

export default CollapsingHeaderFooter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: HEADER_HEIGHT,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: HEADER_HEIGHT,
  },
  contentContainerStyle: {
    marginTop: HEADER_HEIGHT,
  },
});
