import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView,Image,FlatList,TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Icon, Text, View} from 'native-base';
import MessageTextCome from './MessageTextCome';
import MessageTextWent from './MessageTextWent';

export default class MessageScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      dataSource: "",
      tousername: "",
      fromuserid: 0,
      touserid: 0,
      usermessage: "",
    }
    this.getUser =  this.getUser.bind(this);
    this.getMessages =  this.getMessages.bind(this);
    setInterval(() => (
      this.getMessages()
    ), 1000);
  }

  componentDidMount(){
    this.getUser();
    this.getMessages();
  }

  static navigationOptions = ({navigation}) => {
    return {
    headerTitle:(<View style={{ flexDirection: "row" }}><Image style={{width:30, height: 30}} resizeMode="contain" source={require('../assets/me.png')}/><Text style={{marginTop: 5,marginLeft: 5}}>{navigation.getParam('tousername')}</Text></View>),
    };
  };

  getMessages(){
    fetch('http://localhost:8888/chatappWebServices/public/api/getPrivateMessage',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          fromuserid:  this.props.navigation.state.params.userid[0],
          touserid: this.props.navigation.state.params.lookingUserid,
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

  sendMessage(){
    fetch('http://localhost:8888/chatappWebServices/public/api/addPrivateMessage',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          fromuserid:  this.props.navigation.state.params.userid[0],
          touserid: this.props.navigation.state.params.lookingUserid,
          usermessage: this.state.usermessage,
        })
      }).then( (response) => response.json() )
      .then( (responseJson) => {
        console.log(responseJson);
      }).catch((error) => {
        console.log(error)
      });
  }

  getUser(){
    fetch('http://localhost:8888/chatappWebServices/public/api/users/'+this.props.navigation.state.params.lookingUserid,{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then( (response) => response.json() )
      .then( (responseJson) => {
          
          console.log(responseJson);
          this.setState({
            tousername: responseJson[0].username,
          })
          this.props.navigation.setParams({ tousername: this.state.tousername });
      }).catch((error) => {
        console.log(error)
      });
  }

  render() { 
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset="-20" enabled>
          <Container>
            <Content>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) =>  (
                                            item.fromuserid == this.props.navigation.state.params.userid[0] ?   <MessageTextWent message={item.usermessage}/>
                                            : <MessageTextCome message={item.usermessage}/>
                                          )}
                keyExtractor={(item, index) => index}
              />
            </Content>
            <Form style={styles.containerOfKeyboard}>
              <Item style={{backgroundColor: 'white', flex:5}} rounded>
                <Input onChangeText={(text) => this.setState({usermessage: text})} style={styles.sendTextInput} placeholder="write smt!"/>
              </Item>
              <Button onPress={this.sendMessage.bind(this)} style={{marginLeft: 5, flex: 1,alignItems: 'center',justifyContent: 'center',}} primary rounded>
                <Icon  style={{fontSize: 30}} name="ios-send-outline" />
              </Button>
            </Form>
           </Container>
           
        </KeyboardAvoidingView>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    containerOfKeyboard: {
      backgroundColor: '#393e46',
      padding:20,
      flexDirection: "row",
    },
    sendTextInput: {
    }
  });