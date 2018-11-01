/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Button, Text } from 'native-base';

export default class LoginScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Form style={{padding: 20}}>
            <Item floatingLabel last>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last> 
              <Label>Password</Label>
              <Input />
            </Item>
              <Button block style={{marginTop: 30}} onPress={
                () => this.props.navigation.navigate('home')
              }>
                <Text>Sign In</Text>
              </Button>   
              <Button transparent block>
                <Text>Sign Up</Text>
              </Button>  
          </Form>
        </Content>
      </Container>
    );
  }
}