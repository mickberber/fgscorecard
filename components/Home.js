import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../styles/App';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={require('./../assets/footgolf.jpg')}>
          <View style={styles.buttonscontainer}>
            <Link to='/game'>
                <Text style={styles.newbutton}>New</Text>
            </Link>
            <Link to='/statistics'>
              <Text style={styles.statisticsbutton}>Statistics</Text>
            </Link>
          </View>
        </Image>
      </View>
    );
  }
};
