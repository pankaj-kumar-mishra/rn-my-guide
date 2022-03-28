import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import Animated, {FadeInUp, FadeOutLeft, Layout} from 'react-native-reanimated';
import Colors from '../../constants/Colors';

const data = Array(5)
  .fill(0)
  .map((_, idx) => ({id: idx}));

const MagicLayout = () => {
  const isStaggerMode = useRef(true);
  const flatlist = useRef(null);
  const scrollView = useRef(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setItems(data);

      isStaggerMode.current = false;
    }, 1000);
  }, []);

  const handleRemoveItem = useCallback(id => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(prevItems => {
      return prevItems.filter(x => x.id !== id);
    });
  }, []);
  const handleAddItem = useCallback(() => {
    setItems(prevItems => {
      // const nextItem = prevItems.length > 0 ? {id: prevItems.length} : {id: 0};
      const nextItemId = (prevItems[prevItems.length - 1]?.id ?? 0) + 1;
      return [...prevItems, {id: nextItemId}];
    });
  }, []);

  return (
    <>
      <ScrollView
        ref={scrollView}
        onContentSizeChange={() =>
          scrollView.current.scrollToEnd({animated: true})
        }
        style={styles.scrollView}>
        {items.map((item, index) => (
          <Animated.View
            key={item.id}
            //entering={FadeInUp}
            // for stagger animation
            entering={
              isStaggerMode.current ? FadeInUp.delay(index * 100) : FadeInUp
            }
            exiting={FadeOutLeft.duration(500)}
            //layout animation start after exiting done
            layout={Layout.delay(300)}
            style={styles.listItem}>
            <Text style={styles.text}>{item.id}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeBtn}>
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* <FlatList
        ref={flatlist}
        onContentSizeChange={() =>
          flatlist.current.scrollToEnd({animated: true})
        }
        data={items}
        keyExtractor={item => item.id.toString()}
        style={styles.scrollView}
        //itemLayoutAnimation={Layout.springify()}
        renderItem={({item, index}) => (
          <Animated.View
            key={item.id}
            //entering={FadeInUp}
            // for stagger animation
            entering={
              isStaggerMode.current ? FadeInUp.delay(index * 100) : FadeInUp
            }
            exiting={FadeOutLeft.duration(500)}
            //layout animation start after exiting done
            layout={Layout.delay(300)}
            style={styles.listItem}>
            <Text style={styles.text}>{item.id}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeBtn}>
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      /> */}

      {/* <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        style={styles.scrollView}
        renderItem={({item, index}) => (
          <Animated.View
            key={item.id}
            //entering={FadeInUp}
            // for stagger animation
            entering={
              isStaggerMode.current ? FadeInUp.delay(index * 100) : FadeInUp
            }
            // BUG exiting animation not working in flatlist
            //exiting={FadeOutLeft.duration(500)}
            //layout animation start after exiting done
            //layout={Layout.delay(300)}
            style={styles.listItem}>
            <Text style={styles.text}>{item.id}</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleRemoveItem(item.id)}
              style={styles.removeBtn}>
              <Text style={styles.text}>X</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      /> */}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleAddItem}
        style={styles.addBtn}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </>
  );
};

export default MagicLayout;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.gold,
    paddingTop: 10,
  },
  listItem: {
    height: 60,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    marginBottom: 15,
    marginHorizontal: '4%',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: Colors.white,
  },
  addBtn: {
    width: 60,
    aspectRatio: 1,
    backgroundColor: 'goldenrod',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '4%',
    bottom: 10,
  },
  removeBtn: {
    position: 'absolute',
    right: 5,
    top: 5,
    backgroundColor: Colors.red,
    transform: [{scale: 0.8}],
    padding: 5,
  },
});
