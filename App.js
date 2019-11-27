/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Platform,View,Image,Text} from 'react-native';
import { StackNavigator,TabNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon,Root } from 'native-base';

import LoginScreen from './Components/LoginScreen';
import SignUpScreen from './Components/SignUpScreen';
import MainScreen from './Components/MainScreen';
import FriendsScreen from './Components/FriendsScreen';
import PrivateTalks from './Components/AppTabNavigation/PrivateTalks';
import PublicTalks from './Components/AppTabNavigation/PublicTalks';
import NearestPeople from './Components/AppTabNavigation/NearestPeople';
import MessageScreen from './Components/MessageScreen';
import UsersScreen from './Components/UsersScreen';
import AddPublicTalkContent from './Components/AddPublicTalkContent';
import UserLookScreen from './Components/UserLookScreen'
import UserRequestLookScreen from './Components/UserRequestLookScreen';
import PublicTalkPage from './Components/PublicTalkPage';
import ConnectionLost from './Components/ConnectionLost';
import Settings from './Components/AppTabNavigation/Settings';

const AppStackNavigator = StackNavigator({
  login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({
      swipeEnabled: false,
      gesturesEnabled: false
      }
    )
  },

  connectionLost: {
    screen: ConnectionLost,
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      title: "ChatApp",
      headerLeft: (<Icon name="bug" style={{fontSize: 45, paddingLeft: 10 }} />)
        }
      )
  },
  signup: {
    screen: SignUpScreen,
    navigationOptions: ({navigation}) => ({
      title: "Sign Up",
      headerLeft: 
        (<TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon name="ios-arrow-round-back-outline" style={{fontSize: 45, paddingLeft: 10 }} />
                    </TouchableOpacity>)
        }
      )
  },
  messages:{
    screen: MessageScreen,
    navigationOptions: ({navigation}) => ({
      //headerTitle:(<View style={{ flexDirection: "row" }}><Image style={{width:30, height: 30}} resizeMode="contain" source={require('./assets/me.png')}/><Text style={{marginTop: 5,marginLeft: 5}}>Ellie</Text></View>),
      headerLeft: 
        (<TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon name="ios-arrow-round-back-outline" style={{fontSize: 45, paddingLeft: 10 }} />
                    </TouchableOpacity>)
        }
      )
    },
  home: {
    screen: TabNavigator({
      PrivateTalksScreen: {
          screen: PrivateTalks,
          navigationOptions: ({ navigation }) => ({
            title: 'Private Talks',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-person" style={{ color: tintColor }} />
          )
          }),
      },
      PublicTalksScreen: {
          screen: PublicTalks,
          navigationOptions: ({ navigation }) => ({
            title: 'Public Talks',
          }),
      },
      NearestPeopleScreen: {
          screen: NearestPeople,
          navigationOptions: ({ navigation }) => ({
            title: 'Nearest People',
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-paper-plane" style={{ color: tintColor }} />
            )
          }),
      },
      settings:{
        screen: Settings,
        navigationOptions: ({ navigation }) => ({
          title: 'Settings',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-cog" style={{ color: tintColor }} />
          )
        }),
      }
    }, {
      gesturesEnabled: false,
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
          showLabel: true,
          showIcon: true
      }
  }),
    navigationOptions: ({ navigation }) => ( {
      gesturesEnabled: false,
      headerLeft: (<TouchableOpacity onPress={
        () => navigation.navigate('Users',{userid: navigation.state.params.userid})
      }>
                    <Icon name="ios-person-add-outline" style={{ paddingLeft: 10 }} />
                  </TouchableOpacity>),
      title: "Chats",
      headerRight: (<TouchableOpacity onPress={
        () => navigation.navigate('ManageMessages',{userid: navigation.state.params.userid})
      }>
                      <Icon style={{ paddingRight: 10 }} name="ios-add-circle-outline" />
                    </TouchableOpacity>)
      }),
  },
  Users: {
    screen: UsersScreen,
    navigationOptions: ({ navigation }) => ( { 
      title: "Users",
      headerLeft:  
      (<TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="ios-arrow-round-back-outline" style={{fontSize: 45, paddingLeft: 10 }} />
                  </TouchableOpacity>)
    }),
  },
  ManageMessages:{
    screen: createDrawerNavigator({
      Friends: {
        screen: FriendsScreen,
        navigationOptions: ({ navigation }) => ({
          title: 'Friends',
        }),
      },
      AddPublicTalkContent: {
        screen: AddPublicTalkContent,
        navigationOptions: ({ navigation }) => ({
          title: 'Add Public Talk Content',
        }),
      },
    }), navigationOptions: ({ navigation }) => ( { 
        title: "Send Message",
        headerRight: (<TouchableOpacity onPress={
           () => navigation.toggleDrawer()
        }>
                        <Icon style={{ paddingRight: 10 }} name="ios-menu" />
                      </TouchableOpacity>),
        headerLeft:  
        (<TouchableOpacity onPress={() => navigation.goBack()}>
                      <Icon name="ios-arrow-round-back-outline" style={{fontSize: 45, paddingLeft: 10 }} />
                    </TouchableOpacity>)
        }),
       
  },
  LookScreen: {
    screen: UserLookScreen
  },
  RequestLookScreen: {
    screen: UserRequestLookScreen
  },
  PublicTalkPageScreen: {
    screen: PublicTalkPage
  }
})

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Root>
        <AppStackNavigator />
      </Root>
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
