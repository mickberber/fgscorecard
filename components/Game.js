import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View, FlatList } from 'react-native';
import { Link } from 'react-router-native';

import PlayerSignup from './PlayerSignup';
import GamePlayer from './GamePlayer';
import CourseHeader from './CourseHeader';
import FinishGame from './FinishGame';
import { MonarchBay, Pruneridge } from './../courses/courses';
import { styles } from './../styles/App';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHole: null,
      players: [],
      totalPlayers: 0,
      course: MonarchBay
    }

    this._playersignup = this._playersignup.bind(this);
    this._incrementscore = this._incrementscore.bind(this);
  }

  _playersignup(type, player) {
    let players;
    switch(type) {
      case 'add':
        this.setState({
          players: this.state.players.concat(player),
          totalPlayers: this.state.totalPlayers + 1,
        });
        break;
      case 'remove':
        players = this.state.players.slice(0, player.key)
                                    .concat(this.state.players
                                    .slice(player.key + 1));
        this.setState({ players });
        break;
      case 'finish':
        // FIX SHITTY NAMING AND BE ASHAMED OF YOURSELF
        let course = player;
        players = this.state.players.map((player) => {
          return Object.assign({}, player, {
            scores: player.scores.concat([0])
          });
        });
        switch(course) {
          case 'Monarch Bay':
            course = MonarchBay;
            break;
          case 'Pruneridge':
            course = Pruneridge;
            break;
          default:
            course = MonarchBay;
            break;
        }
        this.setState({
          currentHole: 1,
          players,
          course
        });
        break;
      default:
        return this.state;
    }
  }

  _incrementscore(sign, playerkey) {
    let players = this.state.players.map((player) => {
      if (player.key !== playerkey) {
        return player;
      } else {
        const oldscore = player.scores[this.state.currentHole - 1];
        const newscore = (sign === '+') ?
          oldscore + 1 : oldscore - 1;
        return Object.assign({}, player, {
          scores: player.scores.slice(0, this.state.currentHole - 1).concat([newscore])
        });
      }
    });

    this.setState({
      players,
    });
  }

  _finishhole() {
    let players = this.state.players.map((player) => {
      return Object.assign({}, player, {
        scores: player.scores.concat([0]),
      });
    });
    this.setState({
      currentHole: this.state.currentHole + 1,
      players,
    });
  }

  render() {
    if (this.state.currentHole === null) {
      return <PlayerSignup players={this.state.players}
        playersignup={this._playersignup}
        totalPlayers={this.state.totalPlayers} />
      }

    const currentHole = this.state.currentHole;
    const coursehalf = (currentHole > 9) ?
      this.state.course.back : this.state.course.front;

    if (this.state.course.holes[this.state.currentHole - 1] === undefined) {
      return <FinishGame players={this.state.players}
                         totalYardage={this.state.course.total.totalYardage}
                         totalPar={this.state.course.total.par}
                         currentHole={currentHole}
                         coursehalf={coursehalf}
                         currentHoleDetails={this.state.course.holes[this.state.currentHole - 1]}/>
    }

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Text style={styles.coursetitle}>{this.state.course.title}</Text>
          <CourseHeader totalYardage={this.state.course.total.totalYardage}
                        totalPar={this.state.course.total.par}
                        totalHoles={this.state.course.holes.length}
                        currentHole={currentHole}
                        coursehalf={coursehalf}
                        currentHoleDetails={this.state.course.holes[this.state.currentHole - 1]} />
        </View>
        <View style={{flex: 2}}>
          <FlatList data={this.state.players}
                    renderItem={(player) => <GamePlayer player={player}
                                                        currentHole={this.state.currentHole}
                                                        incrementscore={this._incrementscore} />} />
        </View>
        <TouchableHighlight onPress={() => { this._finishhole(); }}>
          <Text style={styles.resumebutton}>Finish Hole</Text>
        </TouchableHighlight>
      </View>
    );
  }
};
