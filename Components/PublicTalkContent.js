/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Body, Left, Text, Icon} from 'native-base';

export default class PersonTag extends Component {
  static navigationOptions = {

    tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-paper-plane" style={{ color: tintColor }} />
    )
  }

  render() {
    return (
        <Card>
            <CardItem>
                <Left>
                    <Body>
                        <Text style={{fontWeight: "900", marginBottom: 10}}>{this.props.title}</Text>
                        <Text note>{this.props.content}</Text>
                        <Text note>{this.props.likes}</Text>
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