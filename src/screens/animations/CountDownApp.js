import React, {useRef, useState, useCallback, useEffect} from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
// const { width, height } = Dimensions.get('window');
const {width, height} = Dimensions.get('screen');
const colors = {
  black: '#323F4E',
  red: '#F76A6A',
  text: '#ffffff',
};

const timers = [...Array(13).keys()].map(i => (i === 0 ? 1 : i * 5));
const ITEM_SIZE = width * 0.38;
const ITEM_SPACING = (width - ITEM_SIZE) / 2;

const CountDownApp = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewY = useRef(new Animated.Value(height)).current; // initial position outside of screen (bottom)
  const btnOY = useRef(new Animated.Value(0)).current;
  const inputDur = useRef(new Animated.Value(timers[0])).current;

  const inputRef = useRef();
  const [duration, setDuration] = useState(timers[0]);

  useEffect(() => {
    const unsubscribeInput = inputDur.addListener(({value}) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });

    return () => {
      inputDur.removeListener(unsubscribeInput);
      inputDur.removeAllListeners();
    };
  }, []);

  const handleAnimation = useCallback(() => {
    inputDur.setValue(duration);

    Animated.sequence([
      Animated.timing(btnOY, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(viewY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      // Animated.timing(viewY, {
      //   toValue: height,
      //   duration: duration * 1000,
      //   useNativeDriver: true,
      // }),
      // DO parallel animation for timer ViewY and Duration
      Animated.parallel([
        Animated.timing(inputDur, {
          toValue: 0, // this one will update in useEffect
          duration: duration * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(viewY, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(400),
    ]).start(() => {
      console.log('Countdown Completed');
      Vibration.cancel();
      Vibration.vibrate();

      // inputDur.setValue(duration);
      // btnOY.setValue(0);
      Animated.timing(btnOY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const opacity = btnOY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const translateY = btnOY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 130],
  });
  const inputOZ = btnOY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />
      <Animated.View
        style={[styles.timerView, {transform: [{translateY: viewY}]}]}
      />
      <Animated.View
        style={[styles.btnPos, {opacity, transform: [{translateY}]}]}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleAnimation}>
          <View style={styles.roundButton} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.flatlistView}>
        {/* SHOW TIMER */}
        <Animated.View
          style={[styles.inputCover, {opacity: inputOZ, zIndex: inputOZ}]}>
          <TextInput
            ref={inputRef}
            defaultValue={String(duration)}
            style={[styles.text, {color: 'goldenrod'}]}
          />
        </Animated.View>
        {/* SHOW FLATLIST (TIMER SELECTION */}
        <Animated.FlatList
          data={timers}
          keyExtractor={item => String(item)}
          horizontal
          bounces={false}
          // Here we calculating Centered Item (Selected/Active item)
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          onMomentumScrollEnd={evt => {
            const idx = Math.round(evt.nativeEvent.contentOffset.x / ITEM_SIZE);
            setDuration(timers[idx]);
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
          style={{flexGrow: 0, opacity}}
          snapToInterval={ITEM_SIZE}
          decelerationRate="fast"
          renderItem={({item, index}) => {
            const inputRange = [
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
              (index + 1) * ITEM_SIZE,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.4, 1, 0.4],
            });
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 1, 0.6],
            });

            return (
              <Animated.View
                style={[styles.listItem, {opacity, transform: [{scale}]}]}>
                <Text style={styles.text}>{item}</Text>
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default CountDownApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  roundButton: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: colors.red,
  },
  flatlistView: {
    flex: 1,
    position: 'absolute',
    top: height / 3.5,
    left: 0,
    right: 0,
  },
  listItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gold',
    borderRadius: ITEM_SIZE / 2,
  },
  text: {
    fontSize: ITEM_SIZE * 0.6,
    fontFamily: 'Menlo',
    color: colors.text,
    fontWeight: '900',
  },
  timerView: {
    ...StyleSheet.absoluteFillObject,
    height,
    width,
    backgroundColor: colors.red,
  },
  btnPos: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  inputCover: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
  },
});

// BEFORE LISTS ANIMATION (Previous/Current/Next Animation)
{
  /* <Animated.FlatList
  data={timers}
  keyExtractor={item => String(item)}
  horizontal
  bounces={false}
  onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
    useNativeDriver: true,
  })}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
  style={{flexGrow: 0}}
  snapToInterval={ITEM_SIZE}
  decelerationRate="fast"
  renderItem={({item, index}) => {
    const inputRange = [
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
      (index + 1) * ITEM_SIZE,
    ];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
    });
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.6, 1, 0.6],
    });

    return (
      <Animated.View style={[styles.listItem, {opacity, transform: [{scale}]}]}>
        <Text style={styles.text}>{item}</Text>
      </Animated.View>
    );
  }}
/>; */
}

// BEFORE ANIMATION
{
  /* <FlatList
  data={timers}
  keyExtractor={item => String(item)}
  horizontal
  bounces={false}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{paddingHorizontal: ITEM_SPACING}}
  style={{flexGrow: 0}}
  snapToInterval={ITEM_SIZE}
  decelerationRate="fast"
  renderItem={({item}) => {
    return (
      <View style={[styles.listItem, {width: ITEM_SIZE}]}>
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  }}
/>; */
}
