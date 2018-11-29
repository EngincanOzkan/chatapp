/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Platform, TouchableOpacity} from 'react-native';
import { TabNavigator,StackNavigator } from 'react-navigation';
import { Icon } from 'native-base';

import PrivateTalks from './AppTabNavigation/PrivateTalks';
import PublicTalks from './AppTabNavigation/PublicTalks';
import NearestPeople from './AppTabNavigation/NearestPeople';

export default class MainScreen extends Component {

  static navigationOptions = {
    headerLeft: (<TouchableOpacity>
                  <Icon name="ios-person-add-outline" style={{ paddingLeft: 10 }} />
                </TouchableOpacity>),
    title: "Chats",
    headerRight: (<TouchableOpacity>
                    <Icon style={{ paddingRight: 10 }} name="ios-add-circle-outline" />
                  </TouchableOpacity>)
    }

  render() {
    return (
      <AppTabNavigator />
    );
  }
}

const AppTabNavigator = TabNavigator({

  PrivateTalksScreen: {
      screen: PrivateTalks
  },
  PublicTalksScreen: {
      screen: PublicTalks
  },
  NearestPeopleScreen: {
      screen: NearestPeople
  }
}, {
      animationEnabled: true,
      swipeEnabled: true,
      tabBarPosition: "bottom",
      tabBarOptions: {
          style: {
              ...Platform.select({
                  android: {
                      backgroundColor: 'white'
                  }
              })
          },
          activeTintColor: '#000',
          inactiveTintColor: '#d1cece',
          showLabel: false,
          showIcon: true
      }
  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});