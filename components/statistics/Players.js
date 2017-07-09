import React from 'react';
import { View, Image, FlatList, Text, Dimensions, AsyncStorage } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../../styles/App';

const keyExtractor = (item, index) => item.name;

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };

    this._calculateAvg = this._calculateAvg.bind(this);
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

  componentDidMount() {
    (async () => {
      try {
        let players = await AsyncStorage.getItem('players');
        players = JSON.parse(players);
        console.log(players)
        if (players === null) {
          players = [];
        }
        this.setState({
          players
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
        justifyContent: 'center'}}>
        <Image style={styles.image,
                      { flex:1,
                        alignItems: 'center',
                        justifyContent: 'center'}}
               source={require('./../../assets/footgolf.jpg')}>
          <Text style={styles.statsapptitle}> fgScorecard </Text>
          <View style={{flex:1}}>
            <FlatList data={this.state.players}
                      keyExtractor={keyExtractor}
                      renderItem={(player) => <View>
                        <Text>{player.item.name}</Text>
                        <Text>Avg/9: {this._calculateAvg(player.item.alltimescores)}</Text>
                      </View>} />
          </View>
          <View style={{flex:2}}>
            <Link to='/statistics' style={styles.link}>
              <Text style={styles.resumebutton}>Statistics</Text>
            </Link>
            <Link to='/' style={styles.link}>
              <Text style={styles.button}>Home</Text>
            </Link>
          </View>
        </Image>
      </View>
    );
  }
}
