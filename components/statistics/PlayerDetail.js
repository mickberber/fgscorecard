import React from 'react';
import { Dimensions, Image, Text, View, FlatList, AsyncStorage, TouchableHighlight } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../../styles/App';

export default class PlayerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.player = props.location.query.player;
    this._calculateBests = this._calculateBests.bind(this);
  }

  _calculateBests(scoresArray) {
    let bestscore18 = 0;
    let bestscore9 = 0;
    scoresArray.forEach((scoreArray) => {
      let totalscore = 0;
      scoreArray.forEach((score) => {
        totalscore += score.score;
      });
      if (scoreArray.length === 18 && totalscore < bestscore18) {
        bestscore18 = totalscore;
      }
      if (scoreArray.length === 9 && totalscore < bestscore9) {
        bestscore9 = totalscore;
      }
    });
    return {
      bestscore18,
      bestscore9,
    };
  }

  render() {
    let { height, width } = Dimensions.get('window');
    let bests = this._calculateBests(this.player.alltimescores);
    let lastfive = this.player.lastfive.map((obj, i) => {
      return <View key={i}>
        <Text>{obj.courseTitle ? obj.courseTitle : ''} </Text>
        <Text>{obj.coursescore}, ({obj.length}) </Text>
      </View>
    });
    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={require('./../../assets/footgolf.jpg')}>
          <Text style={styles.statsapptitle}>fgScorecard</Text>
          <Text style={styles.statsapptitle}>{this.player.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>Avg/9: {this.player.averagepernine} </Text>
            <Text>Total Games: {this.player.alltimescores.length} </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text>Best 18: {bests.bestscore18} </Text>
            <Text>Best 9: {bests.bestscore9} </Text>
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text>Last 5: </Text>
            {lastfive}
          </View>
          <Link to='/statistics' style={styles.link}>
            <Text style={styles.resumebutton}>Statistics</Text>
          </Link>
          <Link to='/' style={styles.link}>
            <Text style={styles.resumebutton}>Home</Text>
          </Link>
        </Image>
      </View>
    );
  }
}
