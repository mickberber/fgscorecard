import React from 'react';
import { Text, View, FlatList, AsyncStorage, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';

import FinishedPlayer from './FinishedPlayer';
import { styles } from './../../styles/App';

export default class FinishGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      totalGames: null,
      finished: false,
    };
  }

  _finishgame() {
    (async () => {
      try {
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
    return (
      <View style={styles.container}>
        <FlatList data={this.props.players}
                  renderItem={(player) => <FinishedPlayer player={player} />} />
        {!this.state.finished ? <TouchableHighlight onPress={() => { this._finishgame(); }}>
            <Text style={styles.resumebutton}>Save Game</Text>
          </TouchableHighlight> : null}
        {!this.state.finished ? <Link to='/statistics'>
          <Text style={styles.statisticsbutton}>Statistics</Text>
        </Link> : null}
      </View>
    );
  }
}
