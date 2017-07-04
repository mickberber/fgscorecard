import React from 'react';
import { Text, View, AsyncStorage, FlatList } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../../styles/App';

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
    return (
      <View style={styles.container}>
        <Link to='/'>
        <Text style={styles.newbutton}>Home</Text>
      </Link>
      <FlatList data={this.state.games}
                horizontal={false}
                renderItem={(game) => {
                  return <View style={{flex: 1}}>
                    <Text style={styles.statstitle}>Course: {game.item.courseTitle}</Text>
                    <FlatList data={game.item.players}
                              horizontal={true}
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
      </View>
    );
  }
}
