/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Container, Content, Icon, Button, Text} from 'native-base'
import MessageTag from '../MessageTag';

export default class NearestPeople extends Component {

  render() {
    return (
      <Container style={styles.container}>
        <Content>
            <MessageTag name="Engin" profilephoto="1"/>
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