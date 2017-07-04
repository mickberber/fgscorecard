import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';

import Home from './components/Home';
import Game from './components/game/Game';
import Statistics from './components/statistics/Statistics';
import FinishGame from './components/finish/FinishGame';

import { styles } from './styles/App';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path='/' component={Home} />
          <Route exact path='/game' component={Game} />
          <Route exact path='/statistics' component={Statistics} />
          <Route path='/statistics/:gameid' component={FinishGame} />
        </View>
      </NativeRouter>
    );
  }
};
