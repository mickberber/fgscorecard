import React from 'react';
import { Alert, Text, TouchableHighlight, View, FlatList } from 'react-native';

import GamePlayerButtons from './GamePlayerButtons';
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
      <GamePlayerButtons totalscore={totalscore}
                         name={props.player.item.name}
                         currentscore={currentscore}
                         incrementScore={incrementScore} />
      <View style={styles.scoredisplayrow2, {width: props.width - 32}}>
        <FlatList data={scores}
                  horizontal={true}
                  renderItem={(score) => {
                    return <View>
                      <Text style={props.currentHole - 1 === score.index ?
                        styles.currentholebox : styles.scorebox}>{score.index + 1}</Text>
                      <Text style={props.currentHole - 1 === score.index ?
                        styles.currentholebox : styles.scorebox}>{score.item.score}</Text>
                    </View>
                  }} />
      </View>
    </View>
  );
}

export default GamePlayer;
