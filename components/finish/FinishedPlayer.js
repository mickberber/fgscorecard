import React from 'react';
import { Text, View, FlatList } from 'react-native';

import { styles } from './../../styles/App';

const keyExtractor = (item, index) => item.key;

const FinishedPlayer = props => {
  const scores = props.player.item.scores.slice();
  const totalscore = scores.reduce((acc, score, index) => {
    return acc + score.score;
  }, 0);

  return (
    <View style={styles.playerdisplayrowtop, {width:props.width - 64}}>
      <View style={styles.scoredisplayrow1}>
        <Text style={styles.playername}>{props.player.item.name}</Text>
        <Text style={styles.removebutton}>{totalscore}</Text>
      </View>
     <View>
       <FlatList data={scores}
                 style={styles.scoredisplayrow2, {width:props.width - 64}}
                 horizontal={true}
                 keyExtractor={keyExtractor}
                 renderItem={(score) => {
                   return <View>
                     <Text style={styles.scorebox}>{score.index + 1}</Text>
                     <Text style={styles.scorebox}>{score.item.score}</Text>
                   </View>
                 }} />
      </View>
    </View>
  );
}

export default FinishedPlayer;
