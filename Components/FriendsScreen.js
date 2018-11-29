/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Container, Content, Input, Button , Form ,Label, Item, Icon, Header, Text,CardItem,Card,Body} from 'native-base';

import PersonTag from './PersonTag';

export default class UsersScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      usernameValue: "",
      dataSource: '',
      requestDataSource: '',
    }
    this.searchUser = this.searchUser.bind(this);
  }

  componentDidMount() {
        this.searchUser("");
  }

  searchUser (text){
    fetch('http://localhost:8888/chatappWebServices/public/api/getFriends', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: text,
        userid: this.props.navigation.state.params.userid[0],
      }),
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        })       

        console.log(responseJson);

    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
    <Container sytle={styles.container}>
      <Item searchBar rounded style={styles.searchBox}>
        <Icon name="ios-search" />
          <Input onChangeText={(text) => this.searchUser(text) } placeholder="Search username..." />
        <Icon name="ios-people" />
      </Item>
      <Text style={styles.header}> Friends </Text>
      { this.state.dataSource != '' ?
        <Content>
          <FlatList
            data={this.state.dataSource}
            renderItem={({item}) =>  
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('messages', {userid: this.props.navigation.state.params.userid, lookingUserid: item.id})}>
                          <PersonTag profilephoto="1" name={item.username}/>
                        </TouchableOpacity> }
            keyExtractor={(item, index) => index}
          />
        </Content>
        :
        <Content>
          <Body style={{backgroundColor: '#B3BCC2'}}><Text> There is no user who have that username </Text></Body>
        </Content> 
      }
    </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchBox: {
      backgroundColor: '#B3BCC2',
      color: 'white',
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
  },header: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#B3BCC2',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});