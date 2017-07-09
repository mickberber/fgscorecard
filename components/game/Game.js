import React from 'react';
import { Dimensions, Image, Alert, Text, Modal, AsyncStorage, TouchableHighlight, View, FlatList } from 'react-native';
import { Redirect } from 'react-router-native';

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
      showModal: false,
      course: MonarchBay,
      courseTitle: 'Monarch Bay',
    }

    this._goOneHoleBack = this._goOneHoleBack.bind(this);
    this._playersignup = this._playersignup.bind(this);
    this._pickCourse = this._pickCourse.bind(this);
    this._incrementscore = this._incrementscore.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._savegame = this._savegame.bind(this);
    this._quitgame = this._quitgame.bind(this);
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
        if (this.state.players.length === 0) {
          Alert.alert('Please enter a name.');
          return;
        }
        let course = this._pickCourse(options);
        this.setState({
          currentHole: 1,
          courseTitle: options,
          course,
        });
        break;
      default:
        return this.state;
    }
  }

  _incrementscore(sign, playerkey) {
    let index = this.state.currentHole - 1;
    const players = this.state.players.map((player) => {
      if (player.key !== playerkey) {
        return player;
      } else {
        const key = player.scores[index].key;
        let oldscore = player.scores[index].score;
        let newscore = (sign === '+') ?
          oldscore + 1 : oldscore - 1;
        if (newscore < 0) {
          newscore = 0;
        }
        return Object.assign({}, player, {
          scores: player.scores.slice(0, this.state.currentHole - 1)
                               .concat([{key, score: newscore}]
                               .concat(player.scores.slice(this.state.currentHole)))
        });
      }
    });

    this.setState({
      players,
      currentHole: this.state.currentHole,
    });
  }

  _finishhole() {
    this.setState({
      currentHole: this.state.currentHole + 1,
    });
  }

  _goOneHoleBack() {
    if (this.state.currentHole === 1) {
      return;
    }
    this.setState({currentHole: this.state.currentHole - 1});
  }

  _toggleModal() {
    this.setState({
      showModal: !this.state.showModal,
    });
  }

  _savegame() {
    (async () => {
      const state = Object.assign({}, this.state, {
        showModal: false,
      });
      try {
        const val = await AsyncStorage.setItem('currentGame', JSON.stringify(this.state));
        this.setState({
          transition: true,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }

  _quitgame() {
    (async () => {
      try {
        const defaultstate = {
          currentHole: null,
          players: [],
          totalPlayers: 0,
          course: MonarchBay,
          courseTitle: 'Monarch Bay',
          showModal: false,
        };
        // Use to clear db
        // const val = await AsyncStorage.setItem('games', JSON.stringify([]));
        const val = await AsyncStorage.setItem('currentGame', JSON.stringify(defaultstate));
        this.setState({
          transition: true,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  };

  componentWillMount() {
    if(this.props.location && this.props.location.query &&  this.props.location.query.loadgame) {
      (async () => {
        try {
          const gametoresume = await AsyncStorage.getItem('currentGame');
          gametoresume = JSON.parse(gametoresume);
          this.setState(gametoresume);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }

  render() {
    if (this.state.transition) {
      return <Redirect to='/' />
    }

    if (this.state.currentHole === null) {
      return <PlayerSignup players={this.state.players}
                           playersignup={this._playersignup}
                           totalPlayers={this.state.totalPlayers} />
    }

    if (this.state.course.holes[this.state.currentHole - 1] === undefined) {
      const game = {
        players: this.state.players,
        courseTitle: this.state.courseTitle,
      };
      return <FinishGame players={this.state.players}
                         game={game}
                         />
    }

    const currentHole = this.state.currentHole;
    const coursehalf = (currentHole > 9) ?
      this.state.course.back : this.state.course.front;
    let { height, width } = Dimensions.get('window');
    /* TODO: remove course related and just use this.state.course */
    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={require('./../../assets/footgolf.jpg')}>
          <View style={{flex: 1}}>
            <Text style={styles.coursetitle}>{this.state.course.title}</Text>
            <CourseHeader totalYardage={this.state.course.total.totalYardage}
                          totalPar={this.state.course.total.par}
                          totalHoles={this.state.course.holes.length}
                          currentHole={currentHole}
                          coursehalf={coursehalf}
                          currentHoleDetails={this.state.course.holes[this.state.currentHole - 1]} />
          </View>
          <TouchableHighlight style={styles.finishholelink} onPress={() => { this._goOneHoleBack(); }}>
            <Text style={styles.finishholebutton}>Previous Hole</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.finishholelink} onPress={() => { this._finishhole(); }}>
            <Text style={styles.finishholebutton}>Next Hole</Text>
          </TouchableHighlight>
          <View style={{flex: 2}}>
            <FlatList data={this.state.players}
                      extraData={this.state.currentHole}
                      renderItem={(player) => <GamePlayer player={player}
                                                          currentHole={this.state.currentHole}
                                                          incrementscore={this._incrementscore}
                                                          height={height}
                                                          width={width} />} />
          </View>
          <TouchableHighlight style={styles.link} onPress={() => { this._toggleModal(); }}>
            <Text style={styles.button}>Save/Quit</Text>
          </TouchableHighlight>
          <Modal animationType={"slide"}
                 transparent={false}
                 visible={this.state.showModal}>
                 <View style={{
                   flex: 1,
                   justifyContent: 'center',
                   alignItems: 'center',
                   backgroundColor: 'rgba(52, 52, 52, 0.5)',
                 }} >
                   <TouchableHighlight style={styles.link} onPress={() => { this._toggleModal(); }}>
                     <Text style={styles.button}>Resume</Text>
                   </TouchableHighlight>
                   <TouchableHighlight style={styles.link} onPress={() => { this._savegame(); }}>
                     <Text style={styles.button}>Save</Text>
                   </TouchableHighlight>
                   <TouchableHighlight style={styles.link} onPress={() => { this._quitgame(); }}>
                     <Text style={styles.quitbutton}>Quit</Text>
                   </TouchableHighlight>
                 </View>
          </Modal>
        </Image>
      </View>
    );
  }
};
