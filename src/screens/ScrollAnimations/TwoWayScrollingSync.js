import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {generateNumbersArray} from '../../common';

const eventItemHeight = 70;
const eventItemMarginBottom = 10;

const TwoWayScrollingSync = () => {
  const dateFlatListRef = useRef(null);
  const eventFlatListRef = useRef(null);
  const dateClickScroll = useRef(false);
  const [dates] = useState(generateNumbersArray(30));
  const [events] = useState(generateNumbersArray(30));
  const [selectedIndex, setSelectedIndex] = useState(0);

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
        showsHorizontalScrollIndicator={false}
        style={styles.spacing}
        keyExtractor={item => item.toString()}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                dateClickScroll.current = true;
                setSelectedIndex(index);
                setTimeout(() => {
                  dateClickScroll.current = false;
                }, 500);
              }}
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
        onScroll={event => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.y /
              (eventItemHeight + eventItemMarginBottom),
          );
          if (!dateClickScroll.current) {
            setSelectedIndex(index);
          }
        }}
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
    height: eventItemHeight,
    borderWidth: 2,
    borderColor: 'goldenrod',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: eventItemMarginBottom,
  },
  eventText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
  },
});

export default TwoWayScrollingSync;
