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
  ToastAndroid,
  InteractionManager
} from 'react-native';
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
    // Storage.set('loginstate', {'state': true}, 1000 * 3600 * 24 * 7);
    // Storage.set('user', {'no': "31301100", 'password': "123"}, 1000 * 3600 * 24 * 7);
    Storage.get('loginstate').then(ret => {
      if(ret.state === true){
        this.props.navigator.replace({id: 'home'});
      }
    }).catch(err => {});
  }

  componentWillUnMount(){
    
  }

  _doSignIn(){
    let {no, pwd, startLogin, logined} = this.state;

    this.state.startLogin = true;

    if(!no.length || no.length !== 8){
      ToastAndroid.show('学号错误.', ToastAndroid.SHORT);
      return;
    }
    if(!pwd.length){
      ToastAndroid.show('密码错误.', ToastAndroid.SHORT);
      return;
    }

    if(no.length === 8 && pwd !== ""){
      ToastAndroid.show('登录中，请稍候.', ToastAndroid.SHORT);
      Storage.get('loginstate')
        .then(ret => {
          if(ret.state === true){
            this.state.logined = true;
            this.props.navigator.replace({id: 'home'});
          }else{
            let logret = auth(no, pwd);
            // auth(no, pwd).then(logret => {
              if(logret.result === true){
                Storage.set('loginstate', {'state': true}, 1000 * 3600 * 24 * 7);
                Storage.set('user', {'no': no, 'password': pwd}, 1000 * 3600 * 24 * 7);
                this.state.logined = true;
                this.props.navigator.replace({id: 'home'});
              }else{
                ToastAndroid.show('学号或密码错误.', ToastAndroid.SHORT);
                this.state.startLogin = false;
              }
            // });
          }
      });
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
            placeholder="请输入学号"
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
            placeholder="请输入密码"
            clearButtonMode="while-editing"
            returnKeyType="done"
            onChangeText={this._onChangePassword.bind(this)}
          />
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity onPress={this._doSignIn.bind(this)}>
            <View style={styles.Login}>
              <Text style={styles.LoginText}>登录</Text>
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
    marginTop: 8,
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