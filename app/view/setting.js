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
        Storage.remove('loginstate');
        Storage.remove('user');
        this.props.navigator.replace({id: 'login'});
        // delete login info...
    }else{
      return null;
    }
  }

  renderRow(rowData, sectionID, rowID){
    if(rowData === "账号名称"){
      var userno = this.state.no;
      console.log(userno);
      return (<Text>学号：{userno}</Text>);
    }else{
      return (<TouchableOpacity 
                onPress={() => this.onRowSelect(rowID)}>
                <View>
                  <Text>{rowData}</Text>
                </View>
              </TouchableOpacity>);
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
  tabItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
})