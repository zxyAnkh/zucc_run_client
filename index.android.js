import React, { Component } from 'react';
import SignInView from './app/view/signin';
import HomeView from './app/view/home';
import HeadView from './app/view/head';
import SettingView from './app/view/setting';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator
} from 'react-native';
import * as Storage from './app/common/storage';


var AwesomeProject = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <HeadView></HeadView>
        <SignInView></SignInView>
      </View>
    );
  }
});

var AwesomeProject = React.createClass({

  getInitialState: function(){
    return {logined:false};
  },

  renderScene: function(route, nav){
    switch(route.id){
      case 'home':
        return <HomeView navigator={nav}/>;
      case 'setting':
        return <SettingView navigator={nav}/>;
      default:
        return (<SignInView navigator={nav}/>);
    }
  },

  render: function(){
    return (
      <Navigator
      style={{backgroundColor: '#fff'}}
      initialRoute={{ id: "login" }}
      renderScene={this.renderScene}
      configureScene={(route) => {
          if (route.sceneConfig) {
              return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight
        }
      }
    />);
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:1,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);