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
    // Storage.set('run', {'data': [{
    //   sno: '31301100',
    //   meter: 2000,
    //      time: 842,
    //    stime: '1488885558849',
    //     etime: '1488885558849'
    //   }, {
    //     sno: '31301100',
    //     meter: 2000,
    //     time: 1563,
    //     stime: '1488885558849',   
    //     etime: '1488885558849'   
    //   }, {   
    //     sno: '31301100',
    //     meter: 2000.95,
    //     time: 1020,
    //     stime: '1488885558849',
    //     etime: '1488885558849'
    //   }, {
    //     sno: '31301100',
    //     meter: 2000,
    //     time: 725,
    //     stime: '1488885558849',
    //     etime: '1488885558849'
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
      return (
        <View style={styles.rowcontainer}>
          <TouchableOpacity style={{}}>
            <Text style={styles.rowno}>序号:{id}</Text>
            <Text style={styles.rowtime}>开始时间:{stime}</Text>
            <Text style={styles.rowtime}>结束时间:{etime}</Text>
            <View style={styles.line}></View>
          </TouchableOpacity>
        </View>);
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
  rowcontainer:{
    flexDirection: 'column',
    width: 500,
  },
  rowno:{
    fontSize: 15,
    textAlign: 'auto',
  },
  rowtime:{
    fontSize: 15,
    textAlign: 'auto',
  },
  line: {
    height:5,
    backgroundColor: '#ccc',
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