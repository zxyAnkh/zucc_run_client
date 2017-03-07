/**
 * home page
 */
'use strict'

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Animated
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Tabbar from 'react-native-tabbar';
import * as Storage from '../common/storage';
import {logout} from '../service/userService';

export default class SettingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      no: '',
      name: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    this._fetchData();
    Storage.get('user').then(ret => {
      this.setState({
        no: ret.no,
      })
    })
  }

  componentWillUnMount() {

  }

  // get data from server
  _fetchData() {
    var data = [
      "账号名称",
      "修改密码",
      "退出登录"
    ];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    })
  }

  onRowSelect(data){
    if(data === "1"){
        this.props.navigator.push({id: 'modifypwd'});
    }else if(data === "2"){
        Storage.set('loginstate', {'state': false}, 1000 * 3600 * 24 * 7);
        Storage.set('user', {'no': "", 'password': ""}, 1000 * 3600 * 24 * 7);
        this.props.navigator.replace({id: 'login'});
        logout();
    }else{
      return null;
    }
  }

  renderRow(rowData, sectionID, rowID){
    if(rowData === "账号名称"){
      var userno = this.state.no;
      return (
        <View style={styles.nocontainer}>
          <Text>学号：{userno}</Text>
          <View style={styles.line}></View>
        </View>);
    }else{
      return (
        <View style={styles.btncontainer}>
          <TouchableOpacity 
              style={styles.btn}
              onPress={() => this.onRowSelect(rowID)}>
            <View>
                <Text style={styles.btnText}>{rowData}</Text>
            </View>
          </TouchableOpacity>
          <View style={{height:5, backgroundColor: '#fff',}}></View>
        </View>);
    }
  }

  onTabSelect(tab){
    if(tab === 'home'){
      this.props.navigator.replace({id: 'home'});
    }else if(tab === 'setting'){
      this.props.navigator.replace({id: 'setting'});
    }
  }

  renderTabs(){
    return (
        <View style={styles.tabbar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('home')}>
          <View>
            <Text style={{color:'#fff'}}>首页</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('setting')}>
          <View>
            <Text style={{color:'#fff'}}>设置</Text>
          </View>
        </TouchableOpacity>
      </View>
      )
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <NavigationBar
          title={{title:'个人设置'}}
          style={styles.topNav}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
        <Tabbar show={true}
                disable={false}
                ref={(ref) => this.tabarRef = ref}
                style={{ backgroundColor: '#0379d5' }}>
          {this.renderTabs()}
        </Tabbar>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  tabbar: {
    flex: 1, 
    flexDirection: 'row', 
    borderTopWidth: 1, 
    borderTopColor: '#0379d5', 
    borderRightWidth: 1, 
    borderRightColor: '#0379d5', 
    borderLeftWidth: 1, 
    borderLeftColor: '#0379d5'
  },
  nocontainer:{
    flexDirection: 'column',
  },
  btncontainer:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  line: {
    height:80,
    backgroundColor: '#fff',
  },
  tabItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  btn: {
    alignItems: 'center',
    width: 250,
    height: 40,
    backgroundColor: '#0379d5',
  },
  btnText: {
    marginTop: 8,
    fontSize: 16,
    color: '#fff',
  },
})