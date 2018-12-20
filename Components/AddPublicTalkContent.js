/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, StyleSheet,KeyboardAvoidingView} from 'react-native';
import { Container, Content, Form, Textarea,Item, Input, Label, Button, Text, Toast} from 'native-base';


export default class AddPublicTalkContent extends Component {

  constructor(props){
    super(props);
    this.state={
        titleData: '',
        contetData: '',
        showToast: false
    }
  }

  addPublicTalkContentData (){
    fetch('http://127.0.0.1:8888/chatappWebServices/public/api/addPublicTalkContent', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: String(this.state.titleData),
        content: String(this.state.contetData),
        userid: String(this.props.navigation.state.params.userid),
      }),
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        console.log(responseJson);
        /*Toast.show({
            text: ,
            buttonText: "Okay",
            position: "bottom"
          });*/
          this.props.navigation.navigate('home',{userid: this.props.navigation.state.params.userid});
    }).catch((error) => {
      console.log(error)
    });
  }

  /* addPublicTalkContentData (){
    fetch('http://www.engincanozkan.com/api/addPublicTalkContent', 
    { method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.titleData,
        content: this.state.contetData,
        userid: this.props.navigation.state.params.userid,
      }),
    })
    .then( (response) => response.json() )
    .then( (responseJson) => {
        this.setState({
          dataSource: responseJson,
        })
        //console.log(this.state.dataSource);
        Toast.show({
            text: this.state.titleData + " " + this.state.contetData + " " + this.props.navigation.state.params.userid,//"Your post shared for public...",
            buttonText: "Okay",
            position: "bottom"
          });
    }).catch((error) => {
        Toast.show({
            text: "Your post did not share for public...",
            buttonText: "Okay",
            position: "bottom"
          });
      console.log(error)
    });
  }*/

  render() {
    //if(this.state.isLoading){
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset="60" enabled>
        <Content padder>
          <Form>
            <Item floatingLabel last>
              <Label>Title</Label>
              <Input onChangeText={(text) => this.setState({titleData: text})}/>
            </Item>
            <Textarea  onChangeText={(text) => this.setState({contetData: text})} rowSpan={15} bordered placeholder="Content..." />
            <Button onPress={this.addPublicTalkContentData.bind(this)} style={{marginTop: 5}} block>
                <Text>Share</Text>
              </Button>  
          </Form>
        </Content>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    }
  });