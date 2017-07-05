import React from 'react';
import { Image, Text, View } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../styles/App';

const Home = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.image}
             source={require('./../assets/footgolf.jpg')}>
        <Text style={styles.apptitle}> fgScorecard </Text>
        <View style={styles.buttonscontainer}>
          <Link to='/game'>
              <Text style={styles.newbutton}>New</Text>
          </Link>
          <Link
                to={{
                  pathname: '/game',
                  query: {
                    loadgame: true,
                  },
                }}>
            <Text style={styles.statisticsbutton}>Resume</Text>
          </Link>
          <Link to='/statistics'>
            <Text style={styles.statisticsbutton}>Statistics</Text>
          </Link>
          {/* <Link to='/players'>
            <Text style={styles.statisticsbutton}>Players</Text>
          </Link> */}
        </View>
      </Image>
    </View>
  );
};

export default Home;
