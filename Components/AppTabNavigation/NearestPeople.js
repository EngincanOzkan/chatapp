/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, FlatList, Dimensions,RefreshControl,TouchableOpacity} from 'react-native';
import { Container, Content, Icon, Button, Text, Item, Picker, Form} from 'native-base'
import MessageTag from '../MessageTag';

const{width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

export default class NearestPeople extends Component {
  constructor(props){
    super(props);
    this.state = {
      nearestpeopledata: "",
      locationSharing: "0",
      initialPosition:{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition:{
        latitude: 0,
        longitude: 0
      },
      selected: "10",
      requestButtonColor: "#157efb",
      requestButtonText: "Active location",
      refreshing: false,
    }
    this.CheckLocationShare = this.CheckLocationShare.bind(this);
    this.getNearestUsers = this.getNearestUsers.bind(this);
    setInterval(() => (
      this.CheckLocationShare()
    ), 5000);



  }

  watchID = null;

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)
      console.log(lat);
      console.log(long);

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})

    }, (error) => alert(JSON.stringify(error)), 
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position)=>{
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATTITUDE_DELTA
      }

      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
  }

  ShareLocation(){
    if(this.state.locationSharing == "0")
    {
      fetch('http://www.engincanozkan.com/api/users/shareLocation',{
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },body: JSON.stringify({
                    userid: this.props.navigation.state.params.userid[0],
                    lat: this.state.markerPosition.latitude,
                    lng: this.state.markerPosition.longitude,
                    locationsharing: this.state.selected,
                  }),
              }).then( (response) => response.json() )
              .then( (responseJson) => {
                  console.log(responseJson);
                  this.CheckLocationShare()
              }).catch((error) => {
                  console.log(error)
              });
      }else {
        fetch('http://www.engincanozkan.com/api/users/shareLocation',{
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },body: JSON.stringify({
                    userid: this.props.navigation.state.params.userid[0],
                    lat: this.state.markerPosition.latitude,
                    lng: this.state.markerPosition.longitude,
                    locationsharing: "0",
                  }),
              }).then( (response) => response.json() )
              .then( (responseJson) => {
                  console.log(responseJson);
                  this.CheckLocationShare()
              }).catch((error) => {
                  console.log(error)
              });
      }
  }

  CheckLocationShare(){
    fetch('http://www.engincanozkan.com/api/users/CheckLocationSharing',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },body: JSON.stringify({
                  userid: this.props.navigation.state.params.userid[0],
                }),
            }).then( (response) => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.setState({
                  locationSharing: responseJson[0].locationsharing
                })
                if(responseJson[0].locationsharing != "0"){
                this.setState({
                    locationsharing: responseJson[0].locationsharing,
                    requestButtonColor: '#cc3e42',
                    requestButtonText: 'Location sharing. Click for stop.'
                })
                this.getNearestUsers()
                }else {
                  this.setState({
                    locationsharing: responseJson[0].locationsharing,
                    requestButtonColor: '#157efb',
                    requestButtonText: 'Active location',
                    nearestpeopledata: ""
                })
                }
            }).catch((error) => {
                console.log(error)
            });
  }

  getNearestUsers(){
    if(this.state.locationSharing != "0"){
      fetch('http://www.engincanozkan.com/api/users/GetNearestPeople',{
                  method: 'POST',
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                  },body: JSON.stringify({
                    userid: this.props.navigation.state.params.userid[0],
                    lng: this.state.markerPosition.longitude,
                    lat: this.state.markerPosition.latitude,
                  }),
              }).then( (response) => response.json() )
              .then( (responseJson) => {
                  console.log(responseJson);
                  this.setState({
                    nearestpeopledata: responseJson,
                  })
              }).catch((error) => {
                  console.log(error)
              });
      }
  }

  onValueChange(value){
    this.setState({
      selected: value
    });
    console.log(value);
  }

  render() {
    return (
      <Container style={styles.container}>
       <Form style={{padding: 20,  alignItems:'center'}}>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="Select Distance"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="1 km" value="1" />
                  <Picker.Item label="2 km" value="2" />
                  <Picker.Item label="3 km" value="3" />
                  <Picker.Item label="3+ km" value="10" />
                </Picker>
              </Item>
              <Button onPress={this.ShareLocation.bind(this)} style={{marginTop: 5, marginLeft: 10, marginRight: 10, backgroundColor: this.state.requestButtonColor}} block>
              <Text>{this.state.requestButtonText}</Text>
            </Button>
          </Form>
        <Content
        refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={
                        this.getNearestUsers.bind(this)
                        //this._onRefresh.bind(this)
                        }
                />
            }>
            <FlatList
            data={this.state.nearestpeopledata}
            renderItem={({item}) =>  
                <TouchableOpacity onPress={() => this.props.navigation.navigate('LookScreen', {lookingUserid: item.id, userid: this.props.navigation.state.params.userid})}>
                    <MessageTag name={item.username}/>
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