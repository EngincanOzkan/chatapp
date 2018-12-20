/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList,RefreshControl, TouchableOpacity} from 'react-native';
import { Container, Content, Icon } from 'native-base'
import PublicTalkContent from './../PublicTalkContent';

export default class PublicTalks extends Component {
    constructor(props){
        super(props);
        this.state={
            dataSource: '',
            refreshing: false,
        }
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-people" style={{ color: tintColor }} />
        )
    }

    componentDidMount() {
        //setInterval(() => {
            this.fetchPublicTalkContentsData();
        //}, 1000);
    }

    fetchPublicTalkContentsData (){
        this.setState({refreshing: true});
        fetch('http://www.engincanozkan.com/api/getContents', 
        { method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        })
        .then( (response) => response.json() )
        .then( (responseJson) => {
            this.setState({
                dataSource: responseJson,
            });
            console.log(responseJson);
            this.setState({refreshing: false});
        }).catch((error) => {
          console.log(error)
        });
      }

  render() {
    return (
        <Container style={styles.container}>
            <Content
            refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={
                        this.fetchPublicTalkContentsData.bind(this)
                        //this._onRefresh.bind(this)
                        }
                />
            }>
            <FlatList
            data={this.state.dataSource}
            renderItem={({item}) =>  
                <TouchableOpacity onPress={() => this.props.navigation.navigate('PublicTalkPageScreen', {publictalkcontentid: item.id, userid: this.props.navigation.state.params.userid})}>
                    <PublicTalkContent title={item.title} content={item.content} likes=""/>
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