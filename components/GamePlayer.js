import React from 'react';
import { Alert, Text, TouchableHighlight, View } from 'react-native';

import { styles } from './../styles/App';

class GamePlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  incrementScore(sign) {
    if(this.props.currentScore === 0) {
      Alert.alert('Cannot decrement score.');
      return;
    }
    this.props.incrementscore(sign, this.props.player.item.key);
  }

  render() {
    const scores = this.props.player.item.scores;
    const totalscore = scores.reduce((score, acc) => {
      return acc + score;
    }, 0);
    const currentscore = this.props.player.item.scores[this.props.currentHole - 1] || 0;

    return (
      <View style={styles.playerdisplayrow}>
        {/*  TODO: refactor out these counters to a sepreate component */}
        <View style={styles.scoredisplayrow1}>
          <Text style={styles.gameplayername}>{this.props.player.item.name}</Text>
          <TouchableHighlight onPress={() => { this.incrementScore('+'); }}>
            <Text style={styles.removebutton}>+</Text>
          </TouchableHighlight>
          <Text style={styles.removebutton}>{currentscore}</Text>
          <TouchableHighlight onPress={() => { this.incrementScore('-'); }}>
            <Text style={styles.removebutton}>-</Text>
          </TouchableHighlight>
          <Text style={styles.removebutton}>{totalscore}</Text>
        </View>
        {/*  END TODO */}
        <View style={styles.scoredisplayrow2}>
          {this.props.player.item.scores.map((score, i) => {
            return (<Text key={i} style={styles.scorebox}>{score}</Text>);
          })}
        </View>
      </View>
    );
  }
}

export default GamePlayer;
