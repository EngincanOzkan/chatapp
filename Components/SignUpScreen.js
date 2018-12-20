/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';


export default class SignUpScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        usernameValue: '',
        nameValue: '',
        surnameValue: '',
        emailValue: '',
        passwordValue: '',
        passwordagainValue: '',
      }
  }  

  SignUpToSystem(){
    fetch('http://www.engincanozkan.com/api/users/signup', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.nameValue,
        surname: this.state.surnameValue,
        username: this.state.usernameValue,
        email: this.state.emailValue,
        password: this.state.passwordValue,
      }),
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        this.props.navigation.navigate('login');
        alert('Welcome to team ' + this.state.usernameValue);
    }).catch((error) => {
        console.log(error)
    });
  }

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset="-20" enabled>
            <Content>
                <Form style={{padding: 20}}>
                    <Item floatingLabel last>
                    <Label>Username</Label>
                    <Input onChangeText={(text) => this.setState({usernameValue: text})}/>
                    </Item>
                    <Item floatingLabel last>
                    <Label>Name</Label>
                    <Input onChangeText={(text) => this.setState({nameValue: text})}/>
                    </Item>
                    <Item floatingLabel last>
                    <Label>Surname</Label>
                    <Input onChangeText={(text) => this.setState({surnameValue: text})}/>
                    </Item>
                    <Item floatingLabel last>
                    <Label>Email</Label>
                    <Input onChangeText={(text) => this.setState({emailValue: text})}/>
                    </Item>
                    <Item floatingLabel last> 
                    <Label>Password</Label>
                    <Input onChangeText={(text) => this.setState({passwordValue: text})} secureTextEntry={true}/>
                    </Item>
                    <Item floatingLabel last> 
                    <Label>Password Again</Label>
                    <Input onChangeText={(text) => this.setState({passwordagainValue: text})} secureTextEntry={true}/>
                    </Item>
                    <Button block style={{marginTop: 30}} onPress={
                      this.SignUpToSystem.bind(this)
                    }>
                        <Text>Sign Up</Text>
                    </Button>
                </Form>
            </Content>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    }
  });