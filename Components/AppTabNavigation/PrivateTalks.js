/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity,FlatList} from 'react-native';
import { Container, Content, Icon } from 'native-base'
import MessageTag from '../MessageTag';

export default class PrivateTalks extends Component {
 constructor(props){
    super(props);
    this.state={
      dataSource: "",
      tousername: "",
      fromuserid: 0,
      touserid: 0,
    }
    this.getChats =  this.getChats.bind(this);
    setInterval(() => (
      this.getChats()
    ), 1000);
  }

  componentDidMount(){
    this.getChats();
  }

  getChats(){
    fetch('http://localhost:8888/chatappWebServices/public/api/getChats',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          fromuserid:  this.props.navigation.state.params.userid[0]
        })
      }).then( (response) => response.json() )
      .then( (responseJson) => {
        this.setState({
          dataSource: responseJson,
        })
        console.log(this.state.dataSource);
      }).catch((error) => {
        console.log(error)
      });
  }

  render() {
    return (
        <Container style={styles.container}>
            <Content>
            <FlatList
            data={this.state.dataSource}
            renderItem={({item}) =>  
                        <TouchableOpacity  onPress={ () => this.props.navigation.navigate('messages', {userid: this.props.navigation.state.params.userid, lookingUserid: item.userid})}>
                            <MessageTag name={item.username} text={item.usermessage} profilephoto="2"/>
                        </TouchableOpacity>
                        }
            keyExtractor={(item, index) => index}
          />
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