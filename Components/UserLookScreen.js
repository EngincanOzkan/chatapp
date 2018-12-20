import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container,Thumbnail,Button,Text} from 'native-base';



export default class UserLookScreen extends Component
{
    constructor(props){
        super(props);
        this.state={
            dataSource: '',
            confirmed: 0,
            requestButtonColor: 'green',
            requestSent: false,
            requestButtonText: 'Send Friend Request',
        }
        this.checkFriendRequest = this.checkFriendRequest.bind(this);
        this.sendFriendRequest = this.sendFriendRequest.bind(this);
    
    }

    checkFriendRequest(){
        fetch('http://www.engincanozkan.com/api/checkFriendStatus',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                friend1id: this.props.navigation.state.params.userid[0],
                friend2id: this.props.navigation.state.params.lookingUserid
            }),
        }).then( (response) => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            if(responseJson[0] == null){
                this.setState({
                    requestSent: false,
                    requestButtonColor: '#5fb760',
                    requestButtonText: 'Send Friend Request'
                })
            }
            else{
                if(responseJson[0].confirmed == '1')
                {
                    this.setState({
                        requestButtonColor: '#157efb',
                        requestSent: true,
                        confirmed: responseJson[0].confirmed,
                        requestButtonText: 'Friend Request Confirmed'
                    })
                }
                else {
                    this.setState({
                        requestButtonColor: '#cc3e42',
                        requestSent: true,
                        confirmed: responseJson[0].confirmed,
                        requestButtonText: 'Remove Friend Request'
                    })
                }
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    sendFriendRequest(){
        if(!this.state.requestSent)
        {
            fetch('http://www.engincanozkan.com/api/addFriend',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },body: JSON.stringify({
                    friend1id: this.props.navigation.state.params.userid[0],
                    friend2id: this.props.navigation.state.params.lookingUserid
                }),
            }).then( (response) => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.setState({
                    requestSent: true
                })
                this.checkFriendRequest()
            }).catch((error) => {
                console.log(error)
            });
        }else{
            fetch('http://www.engincanozkan.com/api/deleteFriend',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },body: JSON.stringify({
                    friend1id: this.props.navigation.state.params.userid[0],
                    friend2id: this.props.navigation.state.params.lookingUserid
                }),
            }).then( (response) => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.setState({
                    requestSent: false,
                    requestButtonColor: '#5fb760',
                    requestButtonText: 'Send Friend Request'
                })
                this.checkFriendRequest()
            }).catch((error) => {
                console.log(error)
            });
        }
        
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
        this.checkFriendRequest();
        this.getUser();
    }

    render(){
        //alert(this.props.navigation.state.params.lookingUserid);
        //const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return(
            this.state.confirmed == '1'  ? 
            <Container style={styles.container}>
                    <Text> {this.state.dataSource} </Text>

                    <Button  onPress={() => this.props.navigation.navigate('messages', {userid: this.props.navigation.state.params.userid, lookingUserid: this.props.navigation.state.params.lookingUserid})} style={styles.buttonMessage} primary block> 
                        <Text>Send Message</Text>
                    </Button>  

                    <Button onPress={this.sendFriendRequest.bind(this)} style={{marginTop: 5, marginLeft: 10, marginRight: 10, backgroundColor: this.state.requestButtonColor}} block> 
                        <Text>{this.state.requestButtonText}</Text> 
                    </Button>
            </Container> 
            : 
             <Container style={styles.container}>
                <Text> {this.state.dataSource} </Text>

                <Button onPress={this.sendFriendRequest.bind(this)} style={{marginTop: 5, marginLeft: 10, marginRight: 10, backgroundColor: this.state.requestButtonColor}} block> 
                    <Text>{this.state.requestButtonText}</Text> 
                </Button>
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