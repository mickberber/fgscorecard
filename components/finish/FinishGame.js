import React from 'react';
import { Dimensions, Image, Text, View, FlatList, AsyncStorage, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';

import FinishedPlayer from './FinishedPlayer';
import { styles } from './../../styles/App';
import {
  MonarchBay,
  Pruneridge,
  LasPositas,
  SantaTeresa
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

  _finishgame() {
    (async () => {
      try {
        // Use to clear db
        // const val = await AsyncStorage.setItem('games', JSON.stringify([]));
        const val = await AsyncStorage.setItem('games', JSON.stringify(this.state.games.concat([this.props.game])));
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
        games = JSON.parse(games);
        if (games === null) {
          games = [];
        }
        this.setState({
          totalGames: games.length,
          games
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
                    style={{width: width - 20, height:140, marginBottom: 20}}
                    horizontal={true}
                    keyExtractor={keyExtractorHole}
                    renderItem={(hole) => <View>
                      <Text style={styles.scoreboxtop}>{hole.item.number}</Text>
                      <Text style={styles.scoreboxtop}>{hole.item.par}</Text>
                    </View>} />
          <FlatList data={this.players}
                    keyExtractor={keyExtractor}
                    renderItem={(player) => <FinishedPlayer player={player} height={height} width={width} />} />
          {!this.state.finished ? <TouchableHighlight style={styles.link} onPress={() => { this._finishgame(); }}>
              <Text style={styles.resumebutton}>Save Game</Text>
            </TouchableHighlight> : null}
          {this.state.finished ? <Link to='/statistics' style={styles.link}>
            <Text style={styles.resumebutton}>Statistics</Text>
          </Link> : null}
        </Image>
      </View>
    );
  }
}
