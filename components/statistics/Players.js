import React from 'react';
import { View, Image, TouchableHighlight, Text, Dimensions } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../../styles/App';

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <View style={{
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
       }}>
        <Image style={styles.image}
               source={require('./../../assets/footgolf.jpg')}>
          <Text style={styles.statsapptitle}> fgScorecard </Text>
          <View>
            <Link to='/statistics' style={styles.link}>
              <Text style={styles.resumebutton}>Statistics</Text>
            </Link>
            <Link to='/' style={styles.link}>
              <Text style={styles.statisticsbutton}>Home</Text>
            </Link>
          </View>
        </Image>
      </View>
    );
  }
}
