/**
 * tab bar
**/
'use strict'

import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Tabbar from 'react-native-tabbar';

export default class TabbarView extends React.Component{

	constructor(props) {
   		super(props);
   	}

	onTabSelect(tab){
		if(tab === 'home'){
			this.props.navigator.push({id: 'home'});
		}else if(tab === 'setting'){
			this.props.navigator.push({id: 'setting'});
		}
	}

	render(){
    return (
    	<Tabbar
          show={true}
          disable={false}
          ref={(ref) => this.tabarRef = ref}>
      	<View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'black' }}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('home')}>
          <View>
            <Text>首页</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('setting')}>
          <View>
            <Text>设置</Text>
          </View>
        </TouchableOpacity>
      </View>
      </Tabbar>
      )
  }
}

var styles = StyleSheet.create({
  tabItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})