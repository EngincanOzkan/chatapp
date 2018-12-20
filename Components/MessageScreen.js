import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView,Image,FlatList,TouchableOpacity} from 'react-native';
import { Container, Content, Form, Item, Input, Icon, Text, View} from 'native-base';
import ImagePicker from "react-native-image-picker";
import MessageTextCome from './MessageTextCome';
import MessageTextWent from './MessageTextWent';

export default class MessageScreen extends Component {

  handleChoosePhoto(){
    const options = {
      noData: true,
    }
    // Open Image Library:
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({ photo: response })
        if(this.state.photo != null){
          this.imageUpload();
        }
      }
    });
  }

  constructor(props){
    super(props);
    this.state={
      dataSource: "",
      tousername: "",
      fromuserid: 0,
      touserid: 0,
      usermessage: "",
      photo: null,
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
    this.component._root.scrollToEnd()
  }

  static navigationOptions = ({navigation}) => {
    return {
    headerTitle:(<View style={{ flexDirection: "row" }}><Image style={{width:30, height: 30}} resizeMode="contain" source={require('../assets/me.png')}/><Text style={{marginTop: 5,marginLeft: 5}}>{navigation.getParam('tousername')}</Text></View>),
    };
  };

  getMessages(){
    fetch('http://www.engincanozkan.com/api/getPrivateMessage',
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
    fetch('http://www.engincanozkan.com/api/addPrivateMessage',
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

  /// IMAGE UPLOAD 
  imageUpload(){

    const form = new FormData();
    console.log(this.state.photo.type);
    form.append("uploads", {
      uri: this.state.photo.uri,
      type: 'image/jpeg', // or photo.type
      name: 'testPhotoName'
    });
    form.append("fromuserid", this.props.navigation.state.params.userid[0]);
    form.append("touserid", this.props.navigation.state.params.lookingUserid);
    form.append("usermessage", "");
    form.append("isfile", "1");

   fetch(
      'http://www.engincanozkan.com/api/imageUpload',
      {
        body: form,
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    ).then((response) => response.json())
    .catch((error) => {
      alert("ERROR " + error)
    })
    .then((responseData) => {
      alert("Succes "+ responseData)
    }).done();
  }
 /// IMAGE UPLOAD 

  getUser(){
    fetch('http://www.engincanozkan.com/api/users/'+this.props.navigation.state.params.lookingUserid,{
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
          <Container style={styles.container}>
            <Content ref={c => (this.component = c)}>
              <FlatList
                data={this.state.dataSource}
                renderItem={({item}) =>  (
                                            item.fromuserid == this.props.navigation.state.params.userid[0] ?   
                                              (item.isfile == "0" ? <MessageTextWent message={item.usermessage} /> : <MessageTextWent image={"http://www.engincanozkan.com/images/"+item.usermessage}/>) :
                                              (item.isfile == "0" ? <MessageTextCome message={item.usermessage} /> : <MessageTextCome image={"http://www.engincanozkan.com/images/"+item.usermessage}/>)
                                          )}
                keyExtractor={(item, index) => index}
              />
            </Content>
            <Form style={styles.containerOfKeyboard}>
              <TouchableOpacity onPress={this.handleChoosePhoto.bind(this)} style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                <Icon  style={{fontSize: 30,color: "#fff"}} name="ios-images" />
              </TouchableOpacity>
              <Item style={{backgroundColor: 'white', flex:5}} rounded>
                <Input onChangeText={(text) => this.setState({usermessage: text})} style={styles.sendTextInput} placeholder="write smt!"/>
              </Item>
              <TouchableOpacity onPress={this.sendMessage.bind(this)} style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                <Icon  style={{fontSize: 40,color: "#fff"}} name="ios-send" />
              </TouchableOpacity>
            </Form>
           </Container>
           
        </KeyboardAvoidingView>
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