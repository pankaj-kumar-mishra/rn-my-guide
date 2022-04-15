import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonCard = () => {
  return (
    <SkeletonPlaceholder>
      {/* <SkeletonPlaceholder highlightColor="gold" backgroundColor="goldenrod"> */}
      <View style={styles.header}>
        <View style={{marginBottom: 10, height: 20}} />
        <View style={{height: 16}} />
      </View>
      <View style={styles.body}></View>
    </SkeletonPlaceholder>
  );
};

export default SkeletonCard;

const styles = StyleSheet.create({
  header: {
    height: 50,
  },
  body: {
    height: 200,
    marginVertical: 15,
  },
});
