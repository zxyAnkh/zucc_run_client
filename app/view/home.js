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
import * as Storage from '../common/storage';
import {loadrun} from '../service/userService';
import NavigationBar from 'react-native-navbar';
import Tabbar from 'react-native-tabbar';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      no: '',
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    Storage.get('user').then(ret => {
      this.setState({
        no: ret.no
      });
    });
    // Storage.remove('run');
  //   Storage.set('run', {'data': [{
  //    sno: '31301100',
  //   meter: 2000,
  //      time: 842,
  //    stime: 'Jul 4, 2016 9:28:45 PM',
  //     etime: 'Jul 4, 2016 9:42:47 PM'
  //   }, {
  //     sno: '31301100',
  //     meter: 2000,
  //     time: 1563,
  //     stime: 'Jul 7, 2016 11:19:47 AM',   
  //     etime: 'Jul 7, 2016 11:45:50 AM'   
  //   }, {   
  //     sno: '31301100',
  //     meter: 2000.95,
  //     time: 1020,
  //     stime: 'Dec 3, 2016 4:00:00 PM',
  //     etime: 'Dec 3, 2016 4:17:00 PM'
  //   }, {
  //     sno: '31301100',
  //     meter: 2000,
  //     time: 725,
  //     stime: 'Dec 4, 2016 2:39:00 PM',
  //     etime: 'Dec 4, 2016 2:51:05 PM'
  //   }]
  // }, 1000 * 3600 * 24 * 31);
    this._fetchData();
  }

  componentWillUnMount() {
  }

  // get data from server
  _fetchData() {
    Storage.get("run").then(ret => {
      if(ret.data === null){
        loadrun(this.state.no);
        setTimeout( () => {
          Storage.get('run').then(result => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(result.data),
            }); 
          })
        }, 1000);
      }else{
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(ret.data),
        }); 
      }
    });
  }

  renderRow(rowData, sectionID, rowID){
    if(rowData !== null){
      let id = parseInt(rowID)+1;
      let date = new Date();
      date.setTime(rowData.stime);
      let stime = this.handleTimeFormat(date);
      date.setTime(rowData.etime);
      let etime = this.handleTimeFormat(date);
      return (<Text>#{id}{'\n'}开始时间:{stime}{'\n'}结束时间:{etime}</Text>);
    }
    return (<Text>正在加载中</Text>);
  }

  handleTimeFormat(time){
      let t = time.toISOString();
      let ret = t.substr(0,10)+" "+t.substr(11,8);
      return ret;
  }

  startRun(){
    this.props.navigator.push({id: 'running'});
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
      <View style={styles.container}>
        <NavigationBar
          title={{title:'跑步记录'}}
          rightButton={{      
            title: '+',
            handler: () => this.startRun(),
          }}
          style={styles.topNav}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          style={styles.listContainer}
        />
        <Tabbar show={true}
                disable={false}
                ref={(ref) => this.tabarRef = ref}
                style={{backgroundColor: '#0379d5'}}>
          {this.renderTabs()}
        </Tabbar>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    height: 48,
  },
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