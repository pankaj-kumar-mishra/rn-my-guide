import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {generateNumbersArray} from '../../common';

const TwoWayScrolling = () => {
  const dateFlatListRef = useRef(null);
  const eventFlatListRef = useRef(null);
  //   const [dates, setDates] = useState(generateNumbersArray(30));
  //   const [events, setEvents] = useState(generateNumbersArray(30));
  const dates = generateNumbersArray(30);
  const events = generateNumbersArray(30);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    eventFlatListRef.current.scrollToIndex({
      index: selectedIndex,
      animated: true,
    });
    dateFlatListRef.current.scrollToIndex({
      index: selectedIndex,
      animated: true,
    });
  }, [selectedIndex]);

  return (
    <>
      <FlatList
        ref={dateFlatListRef}
        data={dates}
        horizontal
        initialScrollIndex={selectedIndex}
        onScrollToIndexFailed={() => console.log('failed')}
        scrollEventThrottle={16}
        // onMomentumScrollEnd={(event) => {
        //     const index = Math.floor(
        //         event.nativeEvent.contentOffset.x /
        //             event.nativeEvent.layoutMeasurement.width
        //     );
        //     // work with: index
        // }}
        showsHorizontalScrollIndicator={false}
        style={styles.spacing}
        keyExtractor={item => item.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedIndex(index)}
              style={[
                styles.dateCover,
                {
                  backgroundColor:
                    selectedIndex === index ? 'goldenrod' : '#000',
                },
              ]}>
              <Text style={styles.dateText}>{item}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
        ref={eventFlatListRef}
        data={events}
        initialScrollIndex={selectedIndex}
        onScrollToIndexFailed={() => console.log('failed')}
        scrollEventThrottle={16}
        // onScroll={event => {
        //   const index = Math.floor(
        //     event.nativeEvent.contentOffset.y /
        //       event.nativeEvent.layoutMeasurement.height,
        //   );
        //   console.log(index);
        //   setSelectedIndex(index);
        // }}
        // onMomentumScrollEnd={event => {
        //   const index = Math.floor(
        //     event.nativeEvent.contentOffset.y /
        //       event.nativeEvent.layoutMeasurement.height,
        //   );
        //   console.log(index);
        //   //   setSelectedIndex(index);
        // }}
        showsVerticalScrollIndicator={false}
        style={styles.spacing}
        keyExtractor={item => item.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedIndex(index)}
              style={styles.eventCover}>
              <Text style={styles.eventText}>{item}</Text>
              <Text style={styles.eventText}>Event Details</Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  spacing: {
    marginTop: 10,
  },
  dateCover: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    color: '#fff',
  },
  eventCover: {
    height: 70,
    borderWidth: 2,
    borderColor: 'goldenrod',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  eventText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
  },
});

export default TwoWayScrolling;
