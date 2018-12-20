/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {CardItem, Text} from 'native-base';

const Dimensions = require('Dimensions');

export default class MessageText extends Component {
  render() {
    console.log(this.props.image);
    if( this.props.image != null ){
      return (
          <View style={styles.container}> 
              <CardItem style={styles.messageBox}> 
                          <Image source={{uri: this.props.image}} style={{height: 200, width: 200, flex: 1}}/>          
              </CardItem>     
          </View>
      );
    }
    else{
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