import React from 'react';
import { Text, View, FlatList, AsyncStorage, TouchableHighlight } from 'react-native';

import FinishedPlayer from './FinishedPlayer';
import { styles } from './../styles/App';

export default class FinishGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      totalGames: null,
    };
  }

  _finishgame() {
    (async () => {
      try {
        const val = await AsyncStorage.setItem('games', JSON.stringify(this.state.games.concat([this.props.game])));
        console.log(val)
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
        <View>
          <Text style={styles.resumebutton}>{this.state.games.length}</Text>
          <Text style={styles.courseheader}>Course Totals</Text>
          <Text style={styles.courseyardpar}>Total Yardage: {this.props.totalYardage}</Text>
          <Text style={styles.courseyardpar}>Par: {this.props.totalPar}</Text>
          <Text style={styles.courseheader}>{(this.props.currentHole > 9) ? 'Back' : 'Front'} 9: Totals</Text>
          <Text style={styles.courseyardpar}>Total Yardage: {this.props.coursehalf.totalYardage}</Text>
          <Text style={styles.courseyardpar}>Par: {this.props.coursehalf.par}</Text>
        </View>
        <FlatList data={this.props.players}
                  renderItem={(player) => <FinishedPlayer player={player} />} />
        <TouchableHighlight onPress={() => { this._finishgame(); }}>
          <Text style={styles.resumebutton}>Save Game</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
