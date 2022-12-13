import React, {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, ScrollView} from 'react-native';
import {PostCard, SkeletonCard} from './components';

import postsData from './data';

const ShimmerEffectPosts = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ScrollView>
          {[1, 2, 3, 4, 5].map(x => (
            <SkeletonCard key={x.toString()} />
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={postsData}
          keyExtractor={({id}) => id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <PostCard item={item} />}
          ItemSeparatorComponent={() => <View style={{height: 15}} />}
        />
      )}
    </View>
  );
};

export default ShimmerEffectPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
