import React from 'react';
import { Text, View, AsyncStorage, FlatList, TouchableHighlight, Dimensions } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../../styles/App';


const keyExtractor = (item, index) => {
  return item.key;
}

const keyExtractorGames = (item, index) => {
  return index;
}

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      totalGames: null,
    };

    this._removeGame = this._removeGame.bind(this);
    this._saveGames = this._saveGames.bind(this);
  }

  _removeGame(index) {
    let games = this.state.slice(0, this.state.totalGames)
                          .concat(this.state
                          .slice(this.state.totalGames + 1));
    this.setState({ games });
  }

  _saveGames() {
    (async () => {
      try {
        const val = await AsyncStorage.setItem('games', JSON.stringify(this.state.games));
        console.log(val);
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
      <View style={{
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
       }}>
      <Text style={styles.statsapptitle}> fgScorecard </Text>
      <FlatList data={this.state.games}
                horizontal={false}
                keyExtractor={keyExtractorGames}
                renderItem={(game) => {
                  return <View style={{
                    width: width - 4,
                    borderBottomWidth: 1,
                    borderBottomColor: 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Text style={styles.statscoursetitle}>
                      {game.item.courseTitle}
                      <Link style={styles.statsdetailslink}
                            to={{
                              pathname: `/statistics/${game.index}`,
                              query: {
                                players: game.item.players,
                                courseTitle: game.item.courseTitle,
                              }
                            }}
                            players={game.item.players}>
                        <Text style={styles.statsdetailsbutton}>Details</Text>
                      </Link>
                    </Text>
                    <FlatList data={game.item.players}
                              style={{width: width - 100}}
                              horizontal={true}
                              keyExtractor={keyExtractor}
                              renderItem={(player) => {
                                let totalscore = player.item.scores.reduce((acc, score) => {
                                  return acc + score.score;
                                }, 0);
                                return <View style={styles.statsplayercontainer}>
                                  <Text style={styles.statsname}>{player.item.name}</Text>
                                  <Text>{totalscore}</Text>
                                </View>
                              }} />
                  </View>
                }}/>
        <Link to='/'>
          <Text style={styles.newbutton}>Home</Text>
        </Link>
      </View>
    );
  }
}
