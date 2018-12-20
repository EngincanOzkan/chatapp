/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NetInfo, AsyncStorage} from 'react-native';
import { Container, Icon, Text } from 'native-base';

export default class ConnectionLost extends Component {

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userid');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.props.navigation.navigate('home', {userid: value});
        Toast.show({
          text: "Welcome to team again :D",
          duration: 3000,
          buttonText: "Okay",
          position: "bottom"
        });
      }else{
        this.props.navigation.navigate('login');
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  handleFirstConnectivityChange(isConnected) {
    if(isConnected){
      this._retrieveData();
    }
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
  }

  componentDidMount(){
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange.bind(this)
    );
  }

  render() {
    //if(this.state.isLoading){
    return (
      <Container style={{flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',}}>
          <Icon name='pulse' />
          <Text>!!Internet Connection Lost!!</Text>
      </Container>
    );
  }
}