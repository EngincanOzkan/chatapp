/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity,FlatList,View} from 'react-native';
import {Container, Form, Item, Content, Card, CardItem, Text, Body, Thumbnail, Icon, Input, Button} from 'native-base'

export default class PublicTalkPage extends Component {
  constructor(props){
    super(props);
    this.getPublicTalkContentsData = this.getPublicTalkContentsData.bind(this);
    this.addPublicMessage = this.addPublicMessage.bind(this);
    this.getPublicTalks = this.getPublicTalks.bind(this);
    this.state={
      dataSource: '',
      dataSourceContent: '',
      mainUserName: '',
      usermessage: '',
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
    headerTitle:<Text style={{marginTop: 5,marginLeft: 5}}>{'...'+String(navigation.getParam('title')).substring(0,14)+'...'}</Text>,
    };
  };

  componentDidMount(){
    this.getPublicTalkContentsData();
    this.getPublicTalks();
  }
 
  addPublicMessage(){
    fetch('http://www.engincanozkan.com/api/addPublicMessage',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid:  this.props.navigation.state.params.userid[0],
        message: this.state.usermessage,
        answerTo: this.props.navigation.state.params.publictalkcontentid,
      })
  }).then( (response) => response.json() )
    .then( (responseJson) => {
        console.log(responseJson);
        this.setState({
          usermessage: '',
        })
    }).catch((error) => {
      console.log(error)
    });
  }

  getUser(userid){
    fetch('http://www.engincanozkan.com/api/users/'+userid,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then( (response) => response.json() )
      .then( (responseJson) => {
          
          console.log(responseJson);
          this.setState({
            mainUserName: responseJson[0].username,
          })
      }).catch((error) => {
        console.log(error)
      });
  }

  getPublicTalkContentsData (){
    fetch('http://www.engincanozkan.com/api/getContent/'+this.props.navigation.state.params.publictalkcontentid, 
    { method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        console.log(responseJson);
        this.setState({
          dataSourceContent: responseJson,
        });   
        this.props.navigation.setParams({ title: this.state.dataSourceContent.title });
        this.getUser(this.state.dataSourceContent.userid);
    }).catch((error) => {
      console.log(error)
    });
  }

  getPublicTalks(){
    fetch('http://www.engincanozkan.com/api/getPublicMessages',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answerTo: this.props.navigation.state.params.publictalkcontentid,
      })
  }).then( (response) => response.json() )
    .then( (responseJson) => {
        console.log(responseJson);
        this.setState({
          dataSource: responseJson,
        })
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
    const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
    return (
      <Container Style={styles.container}>
      <Content>
        <Card style={{ backgroundColor: "#B3BCC2" }}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 5}}>
              <Thumbnail style={{marginRight: 10}} small source={{uri: uri}} />
              <View
                style={{
                  flex:1,
                  paddingBottom: 10,
                  borderBottomColor: 'white',
                  borderBottomWidth: 1,
                  marginRight: 10,
                }}
              >
                <Text note>{this.state.mainUserName}</Text>
              </View>
          </View>
          <CardItem header style={{ backgroundColor: "transparent" }}>
            <Text>{this.state.dataSourceContent.title}</Text>
          </CardItem>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Body>
              <Text>{this.state.dataSourceContent.content}</Text>
            </Body>
          </CardItem>
       </Card>
        <FlatList
              data={this.state.dataSource}
              renderItem={({item}) =>  (<Card>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 5}}>
                        <Thumbnail style={{marginRight: 10}} small source={{uri: uri}} />
                        <View
                          style={{
                            flex:1,
                            paddingBottom: 10,
                            borderBottomColor: '#B3BCC2',
                            borderBottomWidth: 1,
                            marginRight: 10,
                          }}
                        >
                          <Text note>{item.username}</Text>
                        </View>
                    </View>
                    <CardItem style={{ backgroundColor: "transparent" }}>
                      <Body>
                        <Text>{item.message}</Text>
                      </Body>
                    </CardItem>
              </Card>)}
              keyExtractor={(item, index) => index}
          />
      </Content>
      <Form style={styles.containerOfKeyboard}>
        <Item style={{backgroundColor: 'white', flex:5}} rounded>
          <Input onChangeText={(text) => this.setState({usermessage: text})}  value={this.state.usermessage} style={styles.sendTextInput} placeholder="write smt!"/>
        </Item>
        <TouchableOpacity onPress={this.addPublicMessage.bind(this)} style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                <Icon  style={{fontSize: 40,color: "#fff"}} name="ios-send" />
        </TouchableOpacity>
      </Form>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }, 
  containerOfKeyboard: {
    backgroundColor: '#393e46',
    padding:20,
    flexDirection: "row",
  },
  sendTextInput: {
  }
});