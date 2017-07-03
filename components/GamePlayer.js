import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View, TextInput, FlatList } from 'react-native';
import { Link } from 'react-router-native';

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
    let totalscore = 0;
    this.props.player.item.scores.forEach((score) => {
      totalscore = totalscore + score;
    });
    const currentscore = this.props.player.item.scores[this.props.currentHole - 1] || 0;

    return (
      <View style={styles.playerrow}>
        <View style={styles.playerrow}>
          <Text style={styles.playername}>{this.props.player.item.name}</Text>
          <TouchableHighlight onPress={() => { this.incrementScore('+'); }}>
            <Text style={styles.removebutton}>+</Text>
          </TouchableHighlight>
          <Text style={styles.removebutton}>{currentscore}</Text>
          <TouchableHighlight onPress={() => { this.incrementScore('-'); }}>
            <Text style={styles.removebutton}>-</Text>
          </TouchableHighlight>
          <Text style={styles.removebutton}>{totalscore}</Text>
        </View>
        <View style={styles.playerrow}>
          {/* {this.props.player.item.scores.map((score) => {
            return (<Text>{score}</Text>);
          })} */}
        </View>
      </View>
    );
  }
}

export default GamePlayer;
