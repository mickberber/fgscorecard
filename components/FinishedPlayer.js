import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View, TextInput, FlatList } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../styles/App';

class FinishedPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let totalscore = 0;
    this.props.player.item.scores.forEach((score) => {
      totalscore = totalscore + score;
    });

    return (
      <View style={styles.playerdisplayrow}>
        <View style={styles.scoredisplayrow1}>
          <Text style={styles.playername}>{this.props.player.item.name}</Text>
          <Text style={styles.removebutton}>{totalscore}</Text>
        </View>
        <View style={styles.scoredisplayrow2}>
          {this.props.player.item.scores.map((score, i) => {
            return (<Text key={i} style={styles.scorebox}>{score}</Text>);
          })}
        </View>
      </View>
    );
  }
}

export default FinishedPlayer;
