import React from 'react';
import { Alert, Text, TouchableHighlight, View, FlatList } from 'react-native';

import { styles } from './../../styles/App';

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
    const scores = this.props.player.item.scores.slice();
    const totalscore = scores.reduce((acc, score, index) => {
      scores[index] = {key: index, score};
      return acc + score;
    }, 0);
    const currentscore = scores[this.props.currentHole - 1].score || 0;

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
          <FlatList data={scores}
                    horizontal={true}
                    renderItem={(score) => {
                      return <Text style={styles.scorebox}>{score.item.score}</Text>
                    }} />
        </View>
      </View>
    );
  }
}

export default GamePlayer;
