/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {NetInfo,AsyncStorage,StyleSheet} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';

export default class LoginScreen extends Component {

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('userid', this.state.userid);
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userid');
      if (value !== null) {
        // We have data!!
        if(value != 0){
        console.log(value);
        this.props.navigation.navigate('home', {userid: value});
        Toast.show({
          text: "Welcome to team again :D",
          duration: 3000,
          buttonText: "Okay",
          position: "bottom"
        });
      }
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  constructor(props){
    super(props);
    this.state={
      usernameValue: '',
      passwordValue: '',
      isLoading: true,
      dataSource: null,
      showToast: false,
      userid: "0",
    }
    setInterval(() => (
      NetInfo.isConnected.fetch().then(isConnected => {
        if(isConnected)
        {
          console.log('Internet is connected');
        }else
        {
          console.log('Internet connection lost');
          this.props.navigation.navigate('connectionLost');
        }
      })
    ), 1000);
  }

  loginData (){
    fetch('http://www.engincanozkan.com/api/users/signin', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.usernameValue,//"ANANAN",//
        password: this.state.passwordValue,//"1453",//
      }),
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        })
        
        console.log(responseJson);
        let status = this.state.dataSource.map((val, key) => {
          return val.status;
        });
        console.log(status);
        if(status != "0"){
          this.setState({
            userid: status[0]
          })
          this._storeData();
          this.props.navigation.navigate('home', {userid: status});
          Toast.show({
            text: "Welcome to team again :D",
            duration: 3000,
            buttonText: "Okay",
            position: "bottom"
          });
        }else{
          Toast.show({
            text: "Something went wrong!!",
            duration: 3000,
            buttonText: "Okay",
            position: "bottom"
          });
        }
    }).catch((error) => {
      console.log(error);
      Toast.show({
        text: "Check your informations!!",
        duration: 3000,
        buttonText: "Okay",
        position: "bottom"
      });
    });
  }

  loginFunction(){
    this.loginData();
  }

  componentDidMount(){
    this._retrieveData();
  }

  render() {
    //if(this.state.isLoading){
    return (
      <Container>
        <Content>
          <Form style={{padding: 20}}>
            <Item floatingLabel last>
              <Label>Username</Label>
              <Input onChangeText={(text) => this.setState({usernameValue: text})} />
            </Item>
            <Item floatingLabel last> 
              <Label>Password</Label>
              <Input  onChangeText={(text) => this.setState({passwordValue: text})} secureTextEntry={true}/>
            </Item>
              <Button block style={{marginTop: 30}} onPress={
                //() => this.props.navigation.navigate('home')
                this.loginFunction.bind(this)
              }>
                <Text>Sign In</Text>
              </Button>   
              <Button transparent block onPress={
                () => this.props.navigation.navigate('signup')
              }>
                <Text>Sign Up</Text>
              </Button>  
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});