import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import bgImg from '../../assets/images/brick-texture.webp';

const MaskedViewSample = () => {
  return (
    <View style={styles.container}>
      <MaskedView
        //style={{flex: 1}}
        style={{flex: 1, flexDirection: 'row'}}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
            }}>
            <Text style={styles.text}>PANKAJ KUMAR MISHRA</Text>
            <Text style={styles.text}>PANKAJ KUMAR MISHRA</Text>
            <Text style={styles.text}>PANKAJ KUMAR MISHRA</Text>
            <Text style={styles.text}>PANKAJ KUMAR MISHRA</Text>
            <Text style={styles.text}>PANKAJ KUMAR MISHRA</Text>
            <Text style={styles.text}>PANKAJ KUMAR MISHRA</Text>
          </View>
        }>
        <View style={{flex: 1, backgroundColor: '#324376'}} />
        <View style={{flex: 1, backgroundColor: '#F5DD90'}} />
        <Image source={bgImg} style={{flex: 1, height: '100%'}} />
        <View style={{flex: 1, backgroundColor: 'green'}} />
        <View style={{flex: 1, backgroundColor: '#F76C5E'}} />
      </MaskedView>
    </View>
  );
};

export default MaskedViewSample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 50,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
