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
  }

  componentDidMount() {
    (async () => {
      try {
        let players = await AsyncStorage.getItem('players');
        players = JSON.parse(players);
        if (players === null) {
          players = [];
        }
        players.sort((a, b) => {
          return a.averagepernine - b.averagepernine;
        })
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
        <Image style={styles.image}
               source={require('./../../assets/footgolf.jpg')}>
          <Text style={styles.statsapptitle}> fgScorecard </Text>
          <View style={{width: width - 50}}>
            <FlatList data={this.state.players}
                      keyExtractor={keyExtractor}
                      renderItem={(player) => <View style={{
                        marginBottom: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(52, 52, 52, 0.3)'
                      }}>
                        <Text style={styles.statscoursetitle}>{player.item.name}
                            <Link style={styles.statsdetailslink}
                              to={{
                                pathname: `/players/${player.index}`,
                                query: {
                                  player: player.item,
                                }
                              }}>
                              <Text style={styles.statsdetailsbutton}>Player</Text>
                            </Link>
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.statsname}>Avg/9: {player.item.averagepernine} Total Games: {player.item.alltimescores.length} </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={styles.statsname}>Last 5: {player.item.lastfive.map((obj, i) => {
                            return <Text key={i} style={styles.statsname}>{obj.coursescore}, ({obj.length}) </Text>
                          })}</Text>
                        </View>
                      </View>} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Link to='/' style={styles.finishholelink}>
              <Text style={styles.finishholebutton}>Home</Text>
            </Link>
            <Link to='/statistics' style={styles.previousholelink}>
              <Text style={styles.finishholebutton}>Statistics</Text>
            </Link>
          </View>
        </Image>
      </View>
    );
  }
}
