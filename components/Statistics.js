import React from 'react';
import { Text, View, FlatList, AsyncStorage } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../styles/App';

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
    let games = this.state.games.map((game, i) => {
      return (<View key={i}>
        <Text>Course: {game.courseTitle}</Text>
        {game.players.map((player, i) => {
          let totalscore = 0;
          player.scores.forEach((score) => {
            totalscore = totalscore + score;
          });
          return (
            <View key={i * 64}>
              <Text>{player.name}</Text>
              <Text>{totalscore}</Text>
            </View>
          );
        })}
      </View>);
    });
    return (
      <View style={styles.container}>
        <Link to='/'>
            <Text style={styles.newbutton}>Home</Text>
        </Link>
        {games}
      </View>
    );
  }
}
