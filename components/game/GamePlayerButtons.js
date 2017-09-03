import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';

import { styles } from './../../styles/App';

const GamePlayerButtons = props => (
  <View style={styles.scoredisplayrow1}>
    <Text style={styles.gameplayername}>{props.name}</Text>
    <TouchableHighlight onPress={() => { props.incrementScore('+'); }}>
      <Text style={styles.plusbutton}>+</Text>
    </TouchableHighlight>
    <Text style={styles.removebutton}>{props.currentscore}</Text>
    <TouchableHighlight onPress={() => { props.incrementScore('-'); }}>
      <Text style={styles.minusbutton}>-</Text>
    </TouchableHighlight>
    <Text style={styles.removebutton}>{props.totalscore}</Text>
  </View>
);

export default GamePlayerButtons;
