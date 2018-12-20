/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView,AsyncStorage} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';


export default class Settings extends Component {

    _removeData = async () => {
        try {
            await AsyncStorage.removeItem("userid");
            this.props.navigation.navigate('login');
        } catch (error) {
            // Error saving data
        }
    }

  constructor(props) {
      super(props);
      this.state = {
        usernameValue: '',
        nameValue: '',
        surnameValue: '',
        emailValue: '',
        passwordValue: '',
        newpasswordValue: '',
      }

      this.fillUserData = this.fillUserData.bind(this);
  }  

  SignUpToSystem(){
    fetch('http://www.engincanozkan.com/api/users/updateUsers', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid: this.props.navigation.state.params.userid[0],
        name: this.state.nameValue,
        surname: this.state.surnameValue,
        username: this.state.usernameValue,
        email: this.state.emailValue,
        password: this.state.passwordValue,
        newpassword: this.state.newpasswordValue,
      }),
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        if(responseJson == 1){
            this.fillUserData();
            alert('Success');
        }else{
            alert("Check password or don't request current data !!!");
        }
    }).catch((error) => {
        console.log(error)
        alert('Unsuccessful !!!');
    });
  }

  fillUserData(){
    fetch('http://www.engincanozkan.com/api/users/getUserInformations', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid:  this.props.navigation.state.params.userid[0]
      }),
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        console.log(responseJson);
        this.setState({
            usernameValue: responseJson[0].username,
            nameValue: responseJson[0].name,
            surnameValue: responseJson[0].surname,
            emailValue: responseJson[0].email,
        })
    }).catch((error) => {
        console.log(error)
    });
  }

componentDidMount(){
    this.fillUserData()
}

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset="-20" enabled>
            <Content>
                <Form style={{padding: 20}}>
                    <Item floatingLabel last>
                    <Label>Username</Label>
                    <Input value={this.state.usernameValue} onChangeText={(text) => this.setState({usernameValue: text})}/>
                    </Item>
                    <Item floatingLabel last>
                    <Label>Name</Label>
                    <Input  value={this.state.nameValue} onChangeText={(text) => this.setState({nameValue: text})}/>
                    </Item>
                    <Item floatingLabel last>
                    <Label>Surname</Label>
                    <Input value={this.state.surnameValue} onChangeText={(text) => this.setState({surnameValue: text})}/>
                    </Item>
                    <Item floatingLabel last>
                    <Label>Email</Label>
                    <Input value={this.state.emailValue} onChangeText={(text) => this.setState({emailValue: text})}/>
                    </Item>
                    <Item floatingLabel last>
                    <Label>Old Password</Label>
                    <Input onChangeText={(text) => this.setState({passwordValue: text})} secureTextEntry={true}/>
                    </Item>
                    <Item floatingLabel last> 
                    <Label>New Password</Label>
                    <Input onChangeText={(text) => this.setState({newpasswordValue: text})} secureTextEntry={true}/>
                    </Item>
                    <Button block style={{marginTop: 30}} onPress={
                      this.SignUpToSystem.bind(this)
                    }>
                        <Text>Update Informations</Text>
                    </Button>
                </Form>

                <Text style={{textAlign:'center'}}>Or</Text>

                <Button danger block style={{marginTop: 30}} onPress={
                      this._removeData.bind(this)
                    }>
                        <Text>Log Out</Text>
                </Button>
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