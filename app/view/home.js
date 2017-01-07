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
// import TabbarView from './tabs';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  componentWillUnMount() {

  }

  // get data from server
  _fetchData() {
    var data = [{
      uid: 9,
      rid: 4,
      userno: '31301100',
      username: 'student1',
      usergrade: 13,
      userbranch: 1,
      meter: 2000,
      time: 842,
      starttime: 'Jul 4, 2016 9:28:45 PM',
      endtime: 'Jul 4, 2016 9:42:47 PM'
    }, {
      uid: 9,
      rid: 8,
      userno: '31301100',
      username: 'student1',
      usergrade: 13,
      userbranch: 1,
      meter: 2000,
      time: 1563,
      starttime: 'Jul 7, 2016 11:19:47 AM',
      endtime: 'Jul 7, 2016 11:45:50 AM'
    }, {
      uid: 9,
      rid: 10,
      userno: '31301100',
      username: 'student1',
      usergrade: 13,
      userbranch: 1,
      meter: 2000.95,
      time: 1020,
      starttime: 'Dec 3, 2016 4:00:00 PM',
      endtime: 'Dec 3, 2016 4:17:00 PM'
    }, {
      uid: 9,
      rid: 11,
      userno: '31301100',
      username: 'student1',
      usergrade: 13,
      userbranch: 1,
      meter: 2000,
      time: 725,
      starttime: 'Dec 4, 2016 2:39:00 PM',
      endtime: 'Dec 4, 2016 2:51:05 PM'
    }];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    })
  }

  renderRow(rowData, sectionID, rowID){
    var id = parseInt(rowID)+1;
    return (<Text>编号:{id}  学号:{rowData.userno}  姓名:{rowData.username}{'\n'}
      开始时间:{rowData.starttime}  结束时间:{rowData.endtime}
      </Text>);
  }

  startRun(){
    return alert("开始跑步.");
  }

  onTabSelect(tab){
    if(tab === 'home'){
      this.props.navigator.push({id: 'home'});
    }else if(tab === 'setting'){
      this.props.navigator.push({id: 'setting'});
    }
  }

  renderTabs(){
    return (
      <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'blue' }}>
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
      )
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
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
        />
        <Tabbar show={true}
                disable={false}
                ref={(ref) => this.tabarRef = ref}
                style={{ backgroundColor: 'green' }}>
          {this.renderTabs()}
        </Tabbar>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  tabItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})