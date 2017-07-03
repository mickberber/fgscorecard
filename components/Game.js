import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { Link } from 'react-router-native';

import PlayerSignup from './PlayerSignup';
import { MonarchBay } from './../courses/courses';
import { styles } from './../styles/App';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHole: null,
      players: [],
      totalPlayers: 0,
    }

    this._playersignup = this._playersignup.bind(this);
  }

  _playersignup(type, player) {
    switch(type) {
      case 'add':
        this.setState({
          players: this.state.players.concat(player),
          totalPlayers: this.state.totalPlayers + 1,
        });
        break;
      case 'remove':
        let players = this.state.players.slice(0, player.key)
                                        .concat(this.state.players
                                        .slice(player.key + 1));
        this.setState({
          players,
        });
        break;
      case 'finish':
        this.setState({
          currentHole: 1,
        });
        break;
      default:
        return this.state;
    }
  }

  render() {
    console.log('render', this.state)
    if (this.state.currentHole === null) {
      return <PlayerSignup players={this.state.players}
                           playersignup={this._playersignup}
                           totalPlayers={this.state.totalPlayers} />
    }
    const currentHole = this.state.currentHole;
    const coursehalf = (currentHole > 9) ?
      MonarchBay.back : MonarchBay.front;

    return (
      <View style={styles.container}>
        <Text>Hole {this.state.currentHole} </Text>
        <Text>MonarchBay</Text>
        <Text>Course Totals</Text>
        <Text>Total Yardage: {MonarchBay.total.totalYardage}</Text>
        <Text>Par: {MonarchBay.total.par}</Text>
        <Text>{(currentHole > 9) ? 'Back ' : 'Front '}9: Totals</Text>
        <Text>Total Yardage: {coursehalf.totalYardage}</Text>
        <Text>Par: {coursehalf.par}</Text>
      </View>
    );
  }
};
