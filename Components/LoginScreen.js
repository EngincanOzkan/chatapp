/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base';


export default class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      usernameValue: '',
      passwordValue: '',
      isLoading: true,
      dataSource: null,
      showToast: false,
    }
  }

  loginData (){
    fetch('http://localhost:8888/chatappWebServices/public/api/users/signin', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: "DeltaMonkey",//this.state.usernameValue,
        password: "1453",//this.state.passwordValue,
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
      console.log(error)
    });
  }

  loginFunction(){
    this.loginData();
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
    /*        }else{
                let status = this.state.dataSource.map((val, key) => {
                  return <View key={key}>
                      <Text> {val.status} </Text>
                        </View>
                });

                return(
                  <Container>
                    <Content>
                       {status}
                    </Content>
                  </Container>
                );
            }*/
  }
}