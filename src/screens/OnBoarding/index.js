import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {NextCircleBtn, OnBoardingItem, Paginator} from './components';

import slidesData from './data';

const OnBoarding = () => {
  const {width} = useWindowDimensions();
  const flatlistRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  // console.log(currentIndex);

  const scrollTo = () => {
    if (currentIndex < slidesData.length - 1) {
      flatlistRef.current.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      console.log('Last Item');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
        <FlatList
          ref={flatlistRef}
          data={slidesData}
          keyExtractor={({id}) => id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          renderItem={({item}) => <OnBoardingItem item={item} />}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
        />
      </View>

      <Paginator data={slidesData} scrollX={scrollX} />
      <NextCircleBtn
        percentage={(currentIndex + 1) * (100 / slidesData.length)}
        handleNext={scrollTo}
      />

      {/* ONE WAY TO GET ACTIVE/VISIBLE ITEM INDEX */}
      {/* <FlatList
        ref={flatlistRef}
        data={data}
        keyExtractor={({id}) => id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({item}) => <OnBoardingItem item={item} />}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      /> */}

      {/* OTHER WAY GET ACTIVE/VISIBLE ITEM INDEX */}
      {/* <Animated.FlatList
        ref={flatlistRef}
        data={data}
        keyExtractor={({id}) => id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        renderItem={({item}) => <OnBoardingItem item={item} />}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollEnd={evt => {
          const idx = Math.round(evt.nativeEvent.contentOffset.x / width);
          setCurrentIndex(idx);
        }}
      /> */}
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
