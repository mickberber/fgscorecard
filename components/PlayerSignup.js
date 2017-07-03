import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View, TextInput, FlatList } from 'react-native';
import { Link } from 'react-router-native';

import Player from './Player';
import { styles } from './../styles/App';

export default class PlayerSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  addPlayer() {
    if (this.state.text === '') {
      Alert.alert('Please enter a name.');
      return;
    }
    const newplayer = {
      key: this.props.totalPlayers,
      name: this.state.text,
      scores: [],
    };
    this.setState({ text: '' });
    this.props.playersignup('add', newplayer);
  }

  removePlayer(player) {
    this.props.playersignup('remove', player);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={require('./../assets/footgolf.jpg')}>
        <TextInput style={styles.signupInput}
                   value={this.state.text}
                   placeholder='Enter name....'
                   onChangeText={(text) => this.setState({text})} />
        <TouchableHighlight onPress={this.addPlayer}>
          <Text style={styles.resumebutton}>Add</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => { this.props.playersignup('finish'); }}>
          <Text style={styles.statisticsbutton}>Start Game</Text>
        </TouchableHighlight>
        <FlatList data={this.props.players}
                  renderItem={(player) => <Player player={player}
                                                  removePlayer={this.removePlayer} />} />
        </Image>
      </View>
    );
  }
};
