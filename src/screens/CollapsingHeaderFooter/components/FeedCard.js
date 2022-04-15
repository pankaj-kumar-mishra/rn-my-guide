import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const FeedCard = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <Image source={{uri: item.pic}} style={styles.pic} />
    </View>
  );
};

export default FeedCard;

const styles = StyleSheet.create({
  card: {
    height: 300,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 10,
    marginHorizontal: '4%',
    overflow: 'hidden',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  desc: {
    fontSize: 14,
    color: '#888',
  },
  pic: {
    // flex: 1,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});
