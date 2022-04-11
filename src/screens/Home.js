import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MyPressable from '../components/MyPressable';

const Home = () => {
  const navigation = useNavigation();

  const navToScreen = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.lists}>
      <MyPressable text="Bottom Tab One" onPress={() => navToScreen('BTone')} />
      <MyPressable text="Bottom Tab Two" onPress={() => navToScreen('BTtwo')} />
      <MyPressable
        text="Bottom Tab Three"
        onPress={() => navToScreen('BTthree')}
      />

      <View style={styles.line} />
      <MyPressable
        text="formik/Yup Validation"
        onPress={() => navToScreen('FormikYup')}
      />

      <View style={styles.line} />
      <MyPressable
        text="Layout Animation (reanimated)"
        onPress={() => navToScreen('MagicLayout')}
      />
      <MyPressable
        text="Countdown Animation (animated)"
        onPress={() => navToScreen('CountDownApp')}
      />
      <MyPressable
        text="Breathing Animation (animated)"
        onPress={() => navToScreen('BreathingApp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lists: {
    backgroundColor: '#eee',
    padding: 10,
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
