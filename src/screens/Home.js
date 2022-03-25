import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const navToScreen = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.lists}>
      <Pressable style={styles.listItem} onPress={() => navToScreen('BTone')}>
        <Text>Bottom Tab One</Text>
      </Pressable>
      <Pressable style={styles.listItem} onPress={() => navToScreen('BTtwo')}>
        <Text>Bottom Tab Two</Text>
      </Pressable>
      <Pressable style={styles.listItem} onPress={() => navToScreen('BTthree')}>
        <Text>Bottom Tab Three</Text>
      </Pressable>
      <Pressable style={styles.listItem} onPress={() => navToScreen('BTthree')}>
        <Text>Bottom Tab Three</Text>
      </Pressable>
      <View style={styles.line} />
      <Pressable
        style={styles.listItem}
        onPress={() => navToScreen('FormikYup')}>
        <Text>formik/Yup Validation</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  lists: {
    backgroundColor: '#eee',
    padding: 10,
  },
  listItem: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: 'goldenrod',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  line: {
    height: 5,
    width: '100%',
    borderRadius: 5,
    backgroundColor: 'red',
    marginBottom: 10,
  },
});

export default Home;
