import React, { Component } from 'react';
import SignInView from './app/view/signin';
import HomeView from './app/view/home';
import HeadView from './app/view/head';
import SettingView from './app/view/setting';
import ModifyPwdView from './app/view/modifypwd';
import RunningView from './app/view/run';
// import AMapLocationDemo from './app/view/mapdemo';
import * as Storage from './app/common/storage';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator
} from 'react-native';

var zuccrun = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <HeadView></HeadView>
        <SignInView></SignInView>
      </View>
    );
  }
});

var zuccrun = React.createClass({

  getInitialState: function(){
    // Storage.set('loginstate', {'state': true}, 1000 * 3600 * 24 * 7);
    return {logined:false};
  },

  renderScene: function(route, nav){
    switch(route.id){
      case 'home':
        return <HomeView navigator={nav}/>;
      case 'setting':
        return <SettingView navigator={nav}/>;
      case 'login':
        return <SignInView navigator={nav}/>;
      case 'modifypwd':
        return <ModifyPwdView navigator={nav}/>;
      case 'running':
        return <RunningView navigator={nav}/>;
      case 'demo':
        return <AMapLocationDemo navigator={nav}/>;
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

AppRegistry.registerComponent('zuccrun', () => zuccrun);