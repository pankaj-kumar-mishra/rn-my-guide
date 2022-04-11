import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const MyPressable = ({onPress, text}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        {backgroundColor: pressed ? 'gold' : 'white'},
      ]}
      onPress={onPress}>
      {({pressed}) => (
        <Text style={[styles.text, {color: pressed ? 'red' : 'black'}]}>
          {text}
          {pressed && ' (pressed)'}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'gold',
    borderWidth: 3,
    borderColor: 'goldenrod',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    color: 'red',
  },
});

export default MyPressable;
