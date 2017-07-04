import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './../../styles/App';

const FinishedPlayer = props => {
  const scores = props.player.item.scores;
  const totalscore = scores.reduce((score, acc) => {
    return acc + score;
  }, 0);

  return (
    <View style={styles.playerdisplayrow}>
      <View style={styles.scoredisplayrow1}>
        <Text style={styles.playername}>{props.player.item.name}</Text>
        <Text style={styles.removebutton}>{totalscore}</Text>
      </View>
     <View style={styles.scoredisplayrow2}>
        {props.player.item.scores.map((score, i) => {
          return (<Text key={i} style={styles.scorebox}>{score}</Text>);
        })}
      </View>
    </View>
  );
}

export default FinishedPlayer;
