import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View, TextInput, FlatList } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../styles/App';

const Player = props => {
  return (
    <View>
      <Text>{props.player.item.name}</Text>
      <TouchableHighlight onPress={() => { props.removePlayer(props.player.item.key); }}>
        <Text style={styles.removebutton}>X</Text>
      </TouchableHighlight>
    </View>
  );
}

export default class PlayerSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
    this.addPlayer = this.addPlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
  }

  addPlayer() {
    if (this.state.text === '') {
      Alert.alert('Please enter a name.');
      return;
    }
    const newplayer = {
      key: this.props.players.length,
      name: this.state.text,
      scores: [],
    };
    this.setState({ text: '' });
    this.props.playersignup('add', newplayer);
  }

  removePlayer(key) {
    this.props.playersignup('remove', key);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.signupInput}
                   value={this.state.text}
                   placeholder='Enter name....'
                   onChangeText={(text) => this.setState({text})} />
        <TouchableHighlight onPress={this.addPlayer}>
          <Text style={styles.resumebutton}>Add</Text>
        </TouchableHighlight>
        <FlatList data={this.props.players}
                  renderItem={(player) => <Player player={player}
                                                  removePlayer={this.removePlayer} />} />
      </View>
    );
  }
};
