import React from 'react';
import { Dimensions, Image, Text, View, FlatList, AsyncStorage, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';

import FinishedPlayer from './FinishedPlayer';
import { styles } from './../../styles/App';
import {
  MonarchBay,
  Pruneridge,
  LasPositas,
  SantaTeresa,
  RanchoDelPueblo
} from './../../courses/courses';

const keyExtractor = (item, index) => {
  return item.key;
}

const keyExtractorHole = (item, index) => {
  return item.number;
}

export default class FinishGame extends React.Component {
  constructor(props) {
    super(props);
    this.players = props.location ?
      props.location.query.players : props.players;
    this.courseTitle = props.location ?
      props.location.query.courseTitle : props.game.courseTitle;
    this.course = this._pickCourse(this.courseTitle);
    this.state = {
      games: [],
      totalGames: null,
      finished: props.location ? true : false,
    };

    this._savegame = this._savegame.bind(this);
    this._updatePlayers = this._updatePlayers.bind(this);
    this._calculateAvg = this._calculateAvg.bind(this);
    this._getLastFive = this._getLastFive.bind(this);
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
      case 'Rancho Del Pueblo':
        return RanchoDelPueblo;
      default:
        return MonarchBay;
    }
  }

  _calculateAvg(scoresArray) {
    let totalscore = 0;
    scoresArray.forEach((scoreArray) => {
      scoreArray.forEach((score) => {
        totalscore += score.score;
      });
    });
    return totalscore;
  }

  _getLastFive(scoresArray) {
    let lastFive = [];
    for(let i = 1; i < 6; i++) {
      let coursescore = 0;
      if(scoresArray[scoresArray.length - i]) {
        scoresArray[scoresArray.length - i].forEach((score) => {
          coursescore += score.score;
        });
        lastFive.push({
          coursescore,
          length: scoresArray[scoresArray.length - i].length,
        });
      }
    }
    return lastFive;
  }

  _updatePlayers(statePlayers, propsPlayers) {
    let gamePlayerNames = {};
    propsPlayers.forEach((player) => {
      gamePlayerNames[player.name] = player;
    });


    let returningPlayers = statePlayers.map((player) => {
      if (gamePlayerNames[player.name] === undefined) {
        return player;
      } else {
        player.alltimescores.push(gamePlayerNames[player.name].scores)
        player.games.push(this.props.game);
        player.averagepernine = this._calculateAvg(player.alltimescores);
        player.lastfive = this._getLastFive(player.alltimescores);
        delete gamePlayerNames[player.name];
        return player;
      }
    });


    let newPlayers = [];
    for (let name in gamePlayerNames) {
      const newPlayer = {
        name,
        alltimescores: [gamePlayerNames[name].scores],
        averagepernine: this._calculateAvg([gamePlayerNames[name].scores]),
        games: [this.props.game],
        lastfive: this._getLastFive([gamePlayerNames[name].scores]),
      };
      newPlayers.push(newPlayer);
    }

    return returningPlayers.concat(newPlayers);
  }

  _savegame() {
    (async () => {
      try {
        const games = await AsyncStorage.setItem('games',
                              JSON.stringify(
                              this.state.games.concat(
                              [this.props.game])));
        const players = await AsyncStorage.setItem('players',
                                JSON.stringify(
                                this._updatePlayers(
                                this.state.players, this.players)));
        this.setState({
          finished: true,
        })
      } catch (error) {
        console.error(error);
      }
    })();
  }

  componentDidMount() {
    (async () => {
      try {
        let games = await AsyncStorage.getItem('games');
        let players = await AsyncStorage.getItem('players');
        games = JSON.parse(games);
        players = JSON.parse(players);
        if (games === null) {
          games = [];
        }
        if (players === null) {
          players = [];
        }
        this.setState({
          totalGames: games.length,
          games,
          players,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }

  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={require('./../../assets/footgolf.jpg')}>
          <Text style={styles.statsapptitle}>fgScorecard</Text>
          <Text style={styles.statscoursetitle}>{this.courseTitle}</Text>
          <FlatList data={this.course.holes}
                    style={{width: width - 20}}
                    horizontal={true}
                    keyExtractor={keyExtractorHole}
                    renderItem={(hole) => <View>
                      <Text style={styles.scoreboxtop}>{hole.item.number}</Text>
                      <Text style={styles.scoreboxtop}>{hole.item.par}</Text>
                    </View>} />
          <FlatList data={this.players}
                    keyExtractor={keyExtractor}
                    renderItem={(player) => <FinishedPlayer player={player} height={height} width={width} />} />
          {!this.state.finished ? <TouchableHighlight style={styles.link} onPress={() => { this._savegame(); }}>
              <Text style={styles.button}>Save Game</Text>
            </TouchableHighlight> : null}
          {this.state.finished ? <Link to='/statistics' style={styles.link}>
            <Text style={styles.resumebutton}>Statistics</Text>
          </Link> : null}
        </Image>
      </View>
    );
  }
}
