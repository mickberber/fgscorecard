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
      if (scoreArray.length === 18 && totalscore > bestscore18) {
        bestscore18 = totalscore;
      }
      if (scoreArray.length === 9 && totalscore > bestscore9) {
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
      return <View key={i}  style={{ marginBottom: 10,
                                     backgroundColor: 'rgba(52, 52, 52, 0.3)',
                                     width: width - 100,
                                   }}>
        { (i === 0) ? (<Text style={styles.courseheader}>Last 5: </Text>) : null }
        <Text style={styles.statsnameend}>{obj.courseTitle ? obj.courseTitle : ''} {obj.coursescore}, ({obj.length}) </Text>
      </View>
    });
    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={require('./../../assets/footgolf.jpg')}>
          <Text style={styles.statsapptitle}>fgScorecard</Text>
          <Text style={styles.statsapptitle}>{this.player.name}</Text>
          <View style={styles.playerdetailscontainer}>
            <View style={styles.detailscolumn}>
              <Text style={styles.courseheader}>Avg/9:</Text>
              <Text style={styles.statsnameend}>{this.player.averagepernine}</Text>
            </View>
            <View style={styles.detailscolumn}>
              <Text style={styles.courseheader}>Games:</Text>
              <Text style={styles.statsnameend}>{this.player.alltimescores.length}</Text>
            </View>
            <View style={styles.detailscolumn}>
              <Text style={styles.courseheader}>Best 18:</Text>
              <Text style={styles.statsnameend}>{bests.bestscore18}</Text>
            </View>
            <View style={styles.detailscolumn}>
              <Text style={styles.courseheader}>Best 9:</Text>
              <Text style={styles.statsnameend}>{bests.bestscore9}</Text>
            </View>
          </View>
          {lastfive}
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
