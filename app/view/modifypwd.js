/**
 * modify user password page
**/
'use strict';

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ListView,
  TouchableOpacity,
  Animated
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class ModifyPwdView extends React.Component{
	constructor(props){
		super(props);
	}

  	componentDidMount() {
    	
  	}

  	componentWillUnMount() {

  	}

  	backToSetting(){
  		this.props.navigator.pop();
  	}

  	modify(){
  		this.props.navigator.pop();
  	}

  	render(){
  		return (
  			<View>
	  			<NavigationBar
	          		title={{title:'修改密码'}}
	          		leftButton={{      
	            		title: '返回',
	            		handler: () => this.backToSetting(),
	  				}}
	          		style={styles.topNav}
        		/>
        		<View style={styles.inputContainer}>
		          <TextInput
		            ref="no"
		            style={styles.inputs}
		            placeholder="please input your old password"
		            keyboardType="default"
		            clearButtonMode="while-editing"
		            returnKeyType="next"
		          />
		          <View style={styles.line}></View>
		          <TextInput
		            ref="pwdInput"
		            style={styles.inputs}
		            password="true"
		            secureTextEntry={true}
		            placeholder="please input your new password"
		            clearButtonMode="while-editing"
		            returnKeyType="done"
		          />
		          <View style={styles.line}></View>
		          <TextInput
		            ref="pwdInput"
		            style={styles.inputs}
		            password="true"
		            secureTextEntry={true}
		            placeholder="please input your new password again"
		            clearButtonMode="while-editing"
		            returnKeyType="done"
		          />
		        </View>
		        <View style={styles.buttonGroup}>
		          <TouchableOpacity onPress={this.modify.bind(this)}>
		            <View style={styles.Login}>
		              <Text style={styles.LoginText}>确认修改</Text>
		            </View>
		          </TouchableOpacity>
		        </View>
  			</View>
  			);
  	}
}

var styles = StyleSheet.create({
  tabItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    backgroundColor: '#f0ffff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  inputs: {
    height: 40,
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
    height: 40,
    backgroundColor: '#0379d5',
  },
  LoginText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
})