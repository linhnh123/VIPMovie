/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Platform,
  Dimensions,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import dismissKeyboard from 'dismissKeyboard';
import {heightNavBarIOS, heightNavBarAndroid, primaryColor, underlayColor} from '../lib/config';
import Icon from 'react-native-vector-icons/EvilIcons';
const { width, height } = Dimensions.get('window');

const navBarHeight = (Platform.OS === 'ios') ? heightNavBarIOS - 22 : heightNavBarAndroid;

class LeftButton extends Component {
  render() {
    return (
      <TouchableHighlight underlayColor={underlayColor} onPress={()=>this.props.onPress()} style={styles.leftButton}>
        <Icon name="chevron-left" size={50} color={"#fff"}/>
      </TouchableHighlight>
    );
  }
}

class RightButton extends Component {
  render() {
    return (
      <TouchableHighlight style={styles.rightButton} underlayColor={underlayColor} onPress={()=>this.props.onPress({type: 'reset'})}>
        <Icon name="close" size={30} color={"#fff"}/>
      </TouchableHighlight>
    );
  }
}

export default class NavBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: props.title,
      rightButton: props.rightButton || <View/>,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      disabledButton: nextProps.disabled,
      title: nextProps.title,
      rightButton: nextProps.rightButton,
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.title !== this.props.title ||
            nextProps.disabledButton !== this.props.disabledButton ||
            nextProps.rightButton !== this.props.rightButton;
  }

  _pop = () => {
    dismissKeyboard();
    this.props.navigator.pop();
  }

  render() {
    const {leftButton, rightButton, navigator} = this.props;//get tincolor from props
    const { title} = this.state;
    const leftButtonConfig = leftButton ? leftButton : <LeftButton onPress={this._pop.bind(this)}/>;
    const rightButtonConfig = rightButton ? rightButton : <View/>;
    const titleConfig = {
      title,
      tintColor: '#fff',
      style: Platform.OS === 'ios' ? {
        fontSize: 18,
      } : {
        position: 'absolute',
        left: heightNavBarAndroid + 10,
        top: 13,
        fontSize: 18,
      },
    };
    return (
      <View zIndex={10}>
        <NavigationBar
          statusBar={{style: 'light-content'}}
          tintColor={primaryColor}
          title={titleConfig}
          rightButton={rightButtonConfig}
          leftButton={leftButtonConfig}
          style={styles.navBar}
        />
      </View>
    );
  }
}

NavBar.propTypes = {
  tintColor: PropTypes.string,
  title: PropTypes.string,
};

NavBar.defaultProps = {
  tintColor: primaryColor,
  title: '',
};

const styles = StyleSheet.create({
  container: {
    height: navBarHeight,
    backgroundColor: 'red',
  },
  navBar: {
    height: navBarHeight,
    width: width,
  },
  leftButton: {
    height: navBarHeight,
    width: navBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButton: {
    height: navBarHeight,
    width: navBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
