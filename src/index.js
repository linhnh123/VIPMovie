/* @flow */

import React, { Component } from 'react';
import {
  View,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import Navigator from './navigator';
import createStore from './store';

const store = createStore();

export default class Application extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content"/>
          <Navigator />
        </View>
      </Provider>
    );
  }
};
