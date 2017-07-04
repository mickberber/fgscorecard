import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';

import Home from './components/Home';
import Game from './components/Game';
import Statistics from './components/Statistics';

import { styles } from './styles/App';

export default class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Route exact path='/' component={Home} />
          <Route exact path='/game' component={Game} />
          <Route exact path='/statistics' component={Statistics} />
        </View>
      </NativeRouter>
    );
  }
};
