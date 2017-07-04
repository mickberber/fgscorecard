import React from 'react';
import { Text, View, FlatList, AsyncStorage, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';

import FinishedPlayer from './FinishedPlayer';
import { styles } from './../../styles/App';

export default class FinishGame extends React.Component {
  constructor(props) {
    super(props);
    this.players = props.location.query ?
      props.location.query.players : this.props.players;
    this.courseTitle = props.location.query ?
      props.location.query.courseTitle : this.props.courseTitle;
    this.state = {
      games: [],
      totalGames: null,
      finished: props.location.query ? true : false,
    };
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
    return (
      <View style={styles.container}>
        <Text style={styles.statsapptitle}>fgScorecard</Text>
        <Text style={styles.statscoursetitle}>{this.courseTitle}</Text>
        <FlatList data={this.players}
                  renderItem={(player) => <FinishedPlayer player={player} />} />
        {!this.state.finished ? <TouchableHighlight onPress={() => { this._finishgame(); }}>
            <Text style={styles.resumebutton}>Save Game</Text>
          </TouchableHighlight> : null}
        {this.state.finished ? <Link to='/statistics'>
          <Text style={styles.statisticsbutton}>Statistics</Text>
        </Link> : null}
      </View>
    );
  }
}
