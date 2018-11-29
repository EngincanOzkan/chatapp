/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card, CardItem, Thumbnail, Body, Left, Text, Icon} from 'native-base';

export default class PersonTag extends Component {
  render() {
    const images = {
        "1": require('../assets/me.png'),
        "2": require('../assets/asd.png')
    }

    return (
        <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={images[this.props.profilephoto]} />
                        <Body>
                            <Text style={{fontWeight: "900"}}>{this.props.name}</Text>
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