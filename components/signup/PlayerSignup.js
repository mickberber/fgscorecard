import React from 'react';
import {
  Alert,
  Image,
  Text,
  Modal,
  TouchableHighlight,
  Picker,
  View,
  TextInput,
  FlatList
} from 'react-native';
import { Link } from 'react-router-native';

import Player from './Player';
import { styles } from './../../styles/App';

export default class PlayerSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      course: 'Monarch Bay',
      renderPicker: false,
     };
    this._addPlayer = this._addPlayer.bind(this);
    this._removePlayer = this._removePlayer.bind(this);
  }

  _addPlayer() {
    if (this.state.text === '') {
      Alert.alert('Please enter a name.');
      return;
    }

    this.setState({ text: '' });
    this.props.playersignup('add', {
      key: this.props.totalPlayers,
      name: this.state.text,
      scores: [],
    });
  }

  _removePlayer(player) {
    this.props.playersignup('remove', player);
  }

  _togglePicker() {
    this.setState({
      renderPicker: !this.state.renderPicker
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image}
               source={require('./../../assets/footgolf.jpg')}>
           <Text style={styles.statsapptitle}> fgScorecard </Text>
           <Text style={styles.pickcourse}>Pick course: </Text>
           <TouchableHighlight style={styles.link} onPress={() => { this._togglePicker(); }}>
              <Text style={styles.statisticsbutton}>{this.state.course}</Text>
           </TouchableHighlight>
           {/*  TODO: refactor modal into it's own component */}
           <Modal animationType={"slide"}
                  transparent={false}
                  visible={this.state.renderPicker}>
             <Picker style={styles.picker}
                     selectedValue={this.state.course}
                     onValueChange={(course) => {
                       this.setState({
                         course,
                         renderPicker: false,
                       });
                     }}>
               <Picker.Item label={"Monarch Bay"} value={"Monarch Bay"} />
               <Picker.Item label={"Pruneridge"} value={"Pruneridge"} />
               <Picker.Item label={'Las Positas'} value={'Las Positas'} />
               <Picker.Item label={'Santa Teresa'} value={'Santa Teresa'} />
             </Picker>
           </Modal>
           {/* END TODO */}
          <TextInput style={styles.signupInput}
                     value={this.state.text}
                     placeholder='     Enter name....'
                     onChangeText={(text) => this.setState({text})} />
          <TouchableHighlight style={styles.link} onPress={this._addPlayer}>
            <Text style={styles.resumebutton}>Add Player</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.link} onPress={() => { this.props.playersignup('finish', this.state.course); }}>
            <Text style={styles.resumebutton}>Start Game</Text>
          </TouchableHighlight>
          <FlatList data={this.props.players}
                    renderItem={(player) => <Player player={player}
                                                    removePlayer={this._removePlayer} />} />
          <Link to='/' style={styles.link}>
            <Text style={styles.newbutton}>Home</Text>
          </Link>
        </Image>
      </View>
    );
  }
};
