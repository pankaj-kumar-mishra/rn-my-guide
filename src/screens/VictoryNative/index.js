import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, ScrollView} from 'react-native';
import {
  VictoryChart,
  VictoryBar,
  VictoryLine,
  VictoryPie,
  VictoryGroup,
  VictoryTheme,
} from 'victory-native';

const {width, height} = Dimensions.get('screen');

import data from './data';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const VictoryNative = () => {
  const [showGraphs, setShowGraphs] = useState(false);

  const _onInitializeLoadLayout = () => {
    setTimeout(() => {
      setShowGraphs(true);
    }, 0);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>VICTORY NATIVE</Text>
        {showGraphs && (
          <>
            <VictoryChart
              animate
              height={height * 0.5}
              //style={{
              //  background: {fill: 'goldenrod'},
              //  parent: {border: '1px solid red'},
              //}}
              //horizontal
              theme={VictoryTheme.material}>
              <VictoryBar
                style={{data: {fill: 'gold'}}}
                barWidth={20}
                //width={width * 0.9}
                //height={height * 0.5}
                //horizontal
                //animate
                animate={{
                  duration: 3000,
                  onLoad: {
                    duration: 3000,
                  },
                }}
                data={data}
                x="months"
                y="earnings"
              />
            </VictoryChart>

            <VictoryChart height={height * 0.5} theme={VictoryTheme.grayscale}>
              <VictoryLine
                style={{data: {stroke: 'gold', strokeWidth: 5}}}
                animate
                data={data}
                x="months"
                y="earnings"
              />
            </VictoryChart>

            <VictoryPie
              theme={VictoryTheme.material}
              data={data}
              x="months"
              y="earnings"
              labels={months}
            />

            <VictoryChart height={height * 0.5}>
              <VictoryGroup offset={10}>
                <VictoryBar
                  style={{data: {fill: 'red'}}}
                  data={data.slice(0, 4)}
                  x="months"
                  y="earnings"
                />
                <VictoryBar
                  style={{data: {fill: 'gold'}}}
                  data={data.slice(4, 8)}
                  x="months"
                  y="earnings"
                  labels={({datum}) => `${datum._y}`}
                />
                <VictoryBar
                  style={{data: {fill: 'green'}}}
                  data={data.slice(8, 11)}
                  x="months"
                  y="earnings"
                  labels={({datum}) => `${datum._y}`}
                />
                <VictoryBar
                  style={{data: {fill: 'blue'}}}
                  data={data.slice(11)}
                  x="months"
                  y="earnings"
                />
              </VictoryGroup>
            </VictoryChart>
          </>
        )}

        <View onLayout={_onInitializeLoadLayout} />
      </View>
    </ScrollView>
  );
};

export default VictoryNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
