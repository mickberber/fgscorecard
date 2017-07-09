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
                        <View style={{flexDirection: 'row'}}>
                          <Text>{player.item.name} </Text>
                          <Link style={styles.statsdetailslink}
                            to={{
                              pathname: `/players/${player.index}`,
                              query: {
                                player: player.item,
                              }
                            }}>
                            <Text style={styles.statsdetailsbutton}>Card</Text>
                          </Link>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Avg/9: {player.item.averagepernine} </Text>
                          <Text>Total Games: {player.item.alltimescores.length} </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text>Last 5: {player.item.lastfive.map((obj, i) => {
                            return <Text key={i}>{obj.coursescore}, ({obj.length}) </Text>
                          })}</Text>
                        </View>
                      </View>} />
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
