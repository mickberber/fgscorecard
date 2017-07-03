import React from 'react';
import { Alert, Image, Text, TouchableHighlight, View, TextInput, FlatList } from 'react-native';
import { Link } from 'react-router-native';

import { styles } from './../styles/App';

const Player = props => {
  return (
    <View style={styles.playerrow}>
      <Text style={styles.playername}>{props.player.item.name}</Text>
      <TouchableHighlight onPress={() => { props.removePlayer(props.player.item); }}>
        <Text style={styles.removebutton}>X</Text>
      </TouchableHighlight>
    </View>
  );
}

export default Player;
