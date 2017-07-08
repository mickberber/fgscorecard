import React from 'react';
import { Alert, Text, TouchableHighlight, View, FlatList } from 'react-native';

import { styles } from './../../styles/App';

const GamePlayer = props => {
  const incrementScore = sign => {
    if(props.currentScore === 0) {
      return;
    }
    props.incrementscore(sign, props.player.item.key);
  }

  const scores = props.player.item.scores.slice();
  const totalscore = scores.reduce((acc, score, index) => {
    return acc + score.score;
  }, 0);
  const currentscore = scores[props.currentHole - 1].score || 0;

  return (
    <View style={styles.playerdisplayrowtop}>
      {/*  TODO: refactor out these counters to a sepreate component */}
      <View style={styles.scoredisplayrow1}>
        <Text style={styles.gameplayername}>{props.player.item.name}</Text>
        <TouchableHighlight onPress={() => { incrementScore('+'); }}>
          <Text style={styles.plusbutton}>+</Text>
        </TouchableHighlight>
        <Text style={styles.removebutton}>{currentscore}</Text>
        <TouchableHighlight onPress={() => { incrementScore('-'); }}>
          <Text style={styles.minusbutton}>-</Text>
        </TouchableHighlight>
        <Text style={styles.removebutton}>{totalscore}</Text>
      </View>
      {/*  END TODO */}
      <View style={styles.scoredisplayrow2}>
        <FlatList data={scores}
                  horizontal={true}
                  renderItem={(score) => {
                    return <Text style={props.currentHole - 1 === score.index ?
                        styles.currentholebox : styles.scorebox}>{score.item.score}</Text>
                  }} />
      </View>
    </View>
  );
}

export default GamePlayer;
