/**
 * Sign in View
 */
'use strict'

import React from 'react';
import {
	StyleSheet,
	PixelRatio,
	View,
	Text,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ToastAndroid,
  InteractionManager
} from 'react-native';
import constants from '../common/constants';
import {auth} from '../service/userService';
import * as Storage from '../common/storage';

export default class SignInView extends React.Component{

  constructor(props) {
    super(props);
  
    this.state = {
      no: '',
      pwd: '',
      startLogin: false,
      logined: false
    };
  }

  componentDidMount(){
    
  }

  componentWillUnMount(){
    
  }

  _doSignIn(){
    let {no, pwd, startLogin, logined} = this.state;

    AsyncStorage.clear();
    this.state.startLogin = true;

    if(!no.length || no.length !== 8){
      ToastAndroid.show('not correct student number.', ToastAndroid.SHORT);
      return;
    }
    if(!pwd.length){
      ToastAndroid.show('not correct password.', ToastAndroid.SHORT);
      return;
    }

    if(no.length === 8 && pwd !== ""){
      // auth...
      auth(no, pwd);
      setTimeout(() => {
        // let logined = Storage.get("loginstate").state;
        // console.log(logined);
        var logined = true;
        if(logined){
          this.props.navigator.replace({id: 'home'});
          this.state.logined = true;
        }
        else{
          ToastAndroid.show('not correct student number or password.', ToastAndroid.SHORT);
          this.state.startLogin = false;
        }
      }, 3000);
    }
    return;
  }

  _onChangeNo(text){
    this.state.no = text;
  }

  _onChangePassword(text){
    this.state.pwd = text;
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../img/logo.jpg')}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref="no"
            style={styles.inputs}
            placeholder="please input your student number"
            keyboardType="default"
            clearButtonMode="while-editing"
            returnKeyType="next"
            onChangeText={this._onChangeNo.bind(this)}
          />
          <View style={styles.line}></View>
          <TextInput
            ref="pwdInput"
            style={styles.inputs}
            password="true"
            secureTextEntry={true}
            placeholder="please input your password"
            clearButtonMode="while-editing"
            returnKeyType="done"
            onChangeText={this._onChangePassword.bind(this)}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={this._doSignIn.bind(this)}>
            <View style={styles.Login}>
              <Text style={styles.LoginText}>Sign in</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00bfff',
  },
  logoContainer: {
    backgroundColor: '#f0ffff',
    marginTop: 80,
    width: 80,
    height: 80,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  form: {
    marginTop: 30,
  },
  inputContainer: {
    backgroundColor: '#f0ffff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  inputs: {
    height: 40,
    width: 250,
    fontSize: 14,
    padding: 10,
  },
  line: {
    height:0.5,
    backgroundColor: '#ccc',
  },
  buttonGroup: {
    marginTop: 30,
  },
  Login: {
    alignItems: 'center',
    width: 250,
    height: 40,
    backgroundColor: '#0379d5',
  },
  LoginText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  selfHost: {
    position: 'absolute',
    bottom: -100,
    width: 250,
  },
  selfHostText: {
    alignSelf: 'center',
  }
});