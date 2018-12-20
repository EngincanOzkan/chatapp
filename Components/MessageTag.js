/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Thumbnail, Body, Left, Text} from 'native-base';

export default class MessageTag extends Component {
  render() {

    return (
        <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text style={{fontWeight: "900"}}>{this.props.name}</Text>
                            <Text note>{this.props.text}</Text>
                        </Body>
                    </Left>
                </CardItem>
        </Card>
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