/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import MainScreen from './Components/MainScreen';

const AppStackNavigator = StackNavigator({
  login: {
    screen: LoginScreen
  },
  home: {
    screen: MainScreen
  },
})

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
