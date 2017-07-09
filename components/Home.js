import React from 'react';
import { Image, Text, View, AsyncStorage } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../styles/App';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewButton: true,
    };
  }

  componentWillMount() {
    (async () => {
      try {
        let gametoresume = await AsyncStorage.getItem('currentGame');
        gametoresume = JSON.parse(gametoresume);
        if(gametoresume && gametoresume.currentHole !== null) {
          this.setState({
            showNewButton: false,
          });
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }

  render() {
    return (<View style={styles.container}>
      <Image style={styles.image}
             source={require('./../assets/footgolf.jpg')}>
        <Text style={styles.apptitle}> fgScorecard </Text>
        <View style={styles.buttonscontainer}>
          {this.state.showNewButton ? (<Link to='/game' style={styles.link}>
              <Text style={styles.button}>new game</Text>
          </Link>) : (<Link to={{
                                  pathname: '/game',
                                  query: {
                                    loadgame: true,
                                  }}}
                            style={styles.link}>
            <Text style={styles.button}>resume</Text>
          </Link>) }
          <Link to='/statistics' style={styles.link}>
            <Text style={styles.resumebutton}>statistics</Text>
          </Link>
        </View>
      </Image>
    </View>);
  }
};

export default Home;
