import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const navToScreen = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <>
      <Button title="Bottom Tab One" onPress={() => navToScreen('BTone')} />
      <Button title="Bottom Tab Two" onPress={() => navToScreen('BTtwo')} />
      <Button title="Bottom Tab Three" onPress={() => navToScreen('BTthree')} />
    </>
  );
};

export default Home;
