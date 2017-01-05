/* @flow */

import React, { Component } from 'react';
import {
  View,
  Navigator,
} from 'react-native';
import {
  Home,
} from './screens';
import { NavBar } from './components';

export default class NavigatorRN extends Component {
  _pushScreens = (component, title = '', payload = {}) => {
    this.rootNavigator.push({ component, title, payload });
  }

  _popScreens = () => {
    this.rootNavigator.pop();
  }

  _popToTop = () => {
    this.rootNavigator.popToTop();
  }

  _resetToScreens = (component, title = '') => {
    this.rootNavigator.resetTo({ component, title });
  }

  _configureScene = (route, routeStack) => {
    return Navigator.SceneConfigs.PushFromRight;
  }

  _renderScene = (route, navigator) => {
    var key = route.component;
    var title = route.title;
    var Component = null;
    var NavBarApp = <NavBar title={title} navigator={navigator}/>;
    switch (key) {
      default:
        NavBarApp = null;
        Component = Home;
        break;
    }
    return(
      <View style={{flex: 1}}>
        {NavBarApp}
        <Component
          pushScreens={this._pushScreens}
          popScreens={this._popScreens}
          popToTop={this._popToTop}
          resetToScreens={this._resetToScreens}
          route={route}
          navigator={navigator}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator
          ref={(rootNavigator) => this.rootNavigator = rootNavigator}
          style={{flex: 1}}
          renderScene={this._renderScene.bind(this)}
          configureScene = {this._configureScene}
          initialRoute={{
            component: 'Home',
          }}
        />
      </View>
    );
  }
};
