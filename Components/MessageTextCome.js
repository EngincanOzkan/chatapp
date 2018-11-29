/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet,TouchableOpacity,View} from 'react-native';
import {Card, CardItem, Thumbnail, Body, Left, Right, Text, Icon,Container} from 'native-base';

const Dimensions = require('Dimensions');

export default class MessageText extends Component {
  render() {
    const images = {
        "1": require('../assets/me.png'),
        "2": require('../assets/asd.png')
    }
 
    return (
        <View style={styles.container}> 
            <CardItem style={styles.messageBox}>
                        <Text>
                          {this.props.message}
                        </Text>
            </CardItem>  
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  messageBox: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'flex-start',
    width: Dimensions.get('window').width-70,
    backgroundColor: '#00adb5',
  }

});