import React, {Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {Container,Thumbnail,Button,Text,Body} from 'native-base';



export default class UserRequestLookScreen extends Component
{
    constructor(props){
        super(props);
        this.state={
            dataSource: '',
        }
        this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    }

    deleteFriendRequest(){
        fetch('http://www.engincanozkan.com/api/deleteFriend',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },body: JSON.stringify({
                    friend1id: this.props.navigation.state.params.lookingUserid,
                    friend2id: this.props.navigation.state.params.userid[0]
                }),
            }).then( (response) => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.props.navigation.goBack();
            }).catch((error) => {
                console.log(error)
            });
         
    }

    acceptFriendRequest(){
            fetch('http://www.engincanozkan.com/api/acceptRequest',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },body: JSON.stringify({
                    friend1id: this.props.navigation.state.params.lookingUserid,
                    friend2id: this.props.navigation.state.params.userid[0]
                }),
            }).then( (response) => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.props.navigation.goBack();
            }).catch((error) => {
                console.log(error)
            });
    }

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
                dataSource: responseJson[0].username,
              })
          }).catch((error) => {
            console.log(error)
          });
    }

    componentDidMount() {
        this.getUser();
    }

    render(){
        //alert(this.props.navigation.state.params.lookingUserid);
        //const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return(
            <Container style={styles.container}>
                    <Text> {this.state.dataSource} </Text>
                    
                    <View style={{flexDirection: "row"}}>
                        <Button onPress={this.acceptFriendRequest.bind(this)} style={{marginTop: 5, marginLeft:10, marginRight: 5, flex: 1,justifyContent: 'flex-start'}} success> 
                            <Text style={{textAlign: 'center', flex: 1}}>Accept</Text> 
                        </Button>
                        <Button onPress={this.deleteFriendRequest.bind(this)} style={{marginTop: 5, marginLeft:5, marginRight: 10,flex: 1,justifyContent: 'flex-end'}} danger> 
                            <Text style={{textAlign: 'center', flex: 1}}>Cancel</Text> 
                        </Button>
                    </View>
            </Container>
        )
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      },
      buttonMessage:{
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
      }
});