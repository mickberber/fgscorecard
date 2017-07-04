import React from 'react';
import { Text, TouchableHighlight, View, FlatList } from 'react-native';

import PlayerSignup from './../signup/PlayerSignup';
import FinishGame from './../finish/FinishGame';
import CourseHeader from './CourseHeader';
import GamePlayer from './GamePlayer';

import {
  MonarchBay,
  Pruneridge,
  LasPositas,
  SantaTeresa
} from './../../courses/courses';
import { styles } from './../../styles/App';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHole: null,
      players: [],
      totalPlayers: 0,
      course: MonarchBay,
      courseTitle: 'Monarch Bay',
    }

    this._playersignup = this._playersignup.bind(this);
    this._pickCourse = this._pickCourse.bind(this);
    this._incrementscore = this._incrementscore.bind(this);
  }

  _pickCourse(course) {
    switch(course) {
      case 'Monarch Bay':
        return MonarchBay;
      case 'Pruneridge':
        return Pruneridge;
      case 'Las Positas':
        return LasPositas;
      case 'Santa Teresa':
        return SantaTeresa;
      default:
        return MonarchBay;
    }
  }

  _playersignup(type, options) {
    let players;
    switch(type) {
      case 'add':
        this.setState({
          players: this.state.players.concat(options),
          totalPlayers: this.state.totalPlayers + 1,
        });
        break;
      case 'remove':
        players = this.state.players.slice(0, options.key)
                                    .concat(this.state.players
                                    .slice(options.key + 1));
        this.setState({ players });
        break;
      case 'finish':
        players = this.state.players.map((player) => {
          return Object.assign({}, player, {
            scores: player.scores.concat([0])
          });
        });
        let course = this._pickCourse(options);
        this.setState({
          currentHole: 1,
          courseTitle: options,
          players,
          course,
        });
        break;
      default:
        return this.state;
    }
  }

  _incrementscore(sign, playerkey) {
    const players = this.state.players.map((player) => {
      if (player.key !== playerkey) {
        return player;
      } else {
        const oldscore = player.scores[this.state.currentHole - 1];
        const newscore = (sign === '+') ?
          oldscore + 1 : oldscore - 1;
        return Object.assign({}, player, {
          scores: player.scores.slice(0, this.state.currentHole - 1)
                               .concat([newscore])
        });
      }
    });

    this.setState({
      players,
    });
  }

  _finishhole() {
    const players = this.state.players.map((player) => {
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
      const game = {
        players: this.state.players,
        courseTitle: this.state.courseTitle,
      };
        //  TODO: remove and just use this.state.course
        //  totalYardage={this.state.course.total.totalYardage}
        //  totalPar={this.state.course.total.par}
        //  currentHoleDetails={this.state.course.holes[this.state.currentHole - 1]}
        //  coursehalf={coursehalf}
      return <FinishGame players={this.state.players}
                         game={game}
                         course={this.state.course}
                         currentHole={currentHole}
                       />
    }

    /* TODO: remove course related and just use this.state.course */
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
