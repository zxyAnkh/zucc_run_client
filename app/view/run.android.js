/**
 * running page
**/
'use strict'

import React from 'react';
import{
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Alert,
    NativeAppEventEmitter,
    ActivityIndicator,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Platform,
    BackAndroid
} from 'react-native';
import {addrun} from '../service/userService';
import * as Storage from '../common/storage';
import Distance from 'gps-distance';
import NavigationBar from 'react-native-navbar';
import AMapLocation from 'react-native-smart-amap-location'
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance'

class RunningView extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			no: null,
			started: false,
			stoped: false,
			initialTime: 0,
			currentTime: 0,
			minute: 0,
			second: 0,
			millsecond: 0,
			totalMeter: 0,
			latitude: null,
			longitude: null,
			calc: 0,
		}
	}

  	componentDidMount() {
        this.addAppEventListener(
            NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult)
        )
        AMapLocation.init(null)
        AMapLocation.setOptions({
            allowsBackgroundLocationUpdates: true,
            gpsFirst: false,
            onceLocation: false,
            onceLocationLatest: false,
            interval: 1000,
        })
	    if(Platform.OS === 'android'){
	    	BackAndroid.addEventListener('hardwareBackPress', () => {
	    		this.stop();
	        	this.props.navigator.pop();
	        	return true;
	        })
	    }
		Storage.get('user').then(ret => {
	        this.setState({
	          	no: ret.no,
	        })
	      });
  	}

  	componentWillUnMount() {
  		AMapLocation.cleanUp();
  		this.stop();
    	if (Platform.OS === 'android') {  
        	BackAndroid.removeEventListener('hardwareBackPress', () => {  
        	});  
      	} 
  	}
    
  	start(){
  		if(!this.state.stoped){
	  		this.setState({
	  			started: true,
	  			initialTime: (new Date()).getTime()
	  		})
	  		// this.showLocation();
	  		let millsecond, second, minute, countingTime;
	  		let cleaninterval = setInterval(() => {
	  			if (this.state.stoped) {
		            clearInterval(interval);
		            clearInterval(cleaninterval);
		        };
	  		},100);
		    let interval = setInterval(
		        () => { 
		          this.setState({
		            currentTime: (new Date()).getTime(),
		          })
		          countingTime = this.state.currentTime - this.state.initialTime;
		          minute = Math.floor(countingTime/(60*1000));
		          second = Math.floor(countingTime/1000);
		          millsecond = Math.floor(countingTime/100);
		          if(second >= 60){
		          	second %= 60;
		          }
		          this.setState({
		          	minute,
		          	second,
		          	millsecond,
		          })
				  this.state.calc++;
		          if(this.state.calc >= 5){
		          	// 传送数据至服务端
		          	addrun(this.state.no, 2000, this.state.initialTime, this.state.currentTime);
		          	setTimeout(() => {
		          		Storage.get('addRunResult').then(ret =>{
	          			if(ret.result === true){
	          				Alert.alert("数据成功上传至服务端");
	          			}else{
	          				Alert.alert("数据上传至服务端失败");
	          			}
			          });
		          	}, 500);
		          	this.stop();
		          	clearInterval(interval);
			        clearInterval(cleaninterval);
		          }
		        },100);
  			}
  	}

  	_onLocationResult = (result) => {
  		let latitude, longitude;
        if(result.error) {
            Alert.alert("请打开网络与GPS定位！");
        }
        else {
        	if(result.coordinate !== null){
	            latitude = result.coordinate.latitude;
	            longitude = result.coordinate.longitude;
        	}else{
        		Alert.alert("请打开网络与GPS定位！");
        	}
        }
        let [lastlatitude,lastlongitude, totalMeter, calc] = [this.state.latitude, this.state.longitude, this.state.totalMeter, this.state.calc];
		if(calc === 0){
			[lastlatitude,lastlongitude] = [latitude, longitude];
		}
		calc++;
        let meter = Distance(lastlatitude, lastlongitude, latitude, longitude);
	    totalMeter += meter;
        this.setState({
            latitude,
            longitude,
            totalMeter,
            calc,
        });
  	}

    showLocation(){
        AMapLocation.startUpdatingLocation();
    }

  	stop(){
  		this.setState({
			started: false,
			stoped: true,
			initialTime: 0,
			currentTime: 0,
			minute: 0,
			second: 0,
			millsecond: 0,
			totalMeter: 0,
			latitude: null,
			longitude: null,
			calc: 0,
  		});
  		AMapLocation.stopUpdatingLocation();
  	}

	backToHome(){
		this.stop();
		this.props.navigator.pop();
	}

	render(){
		let [latitude,longitude] = [this.state.latitude, this.state.longitude];
		if(latitude===null || longitude===null){
			latitude = 0;
			longitude = 0;
		}
		let [minute, second, millsecond] = [this.state.minute, this.state.second, this.state.millsecond];
		return (
  			<View style={{flex:1}}>
	  			<NavigationBar
	          		title={{title:'正在跑步'}}
	          		leftButton={{      
	            		title: '返回',
	            		handler: () => this.backToHome(),
	  				}}
	          		style={styles.topNav}
        		/>
        		<View style={styles.faceContainer}>
        			<Text style={styles.faceText}>{`00:${minute<10? "0"+minute:minute}:${second<10? "0"+second:second}.${millsecond<10? "0"+millsecond:millsecond}`}</Text>
        			<Text style={styles.faceText}>{`${this.state.totalMeter}米`}</Text>
        			<Text style={styles.faceText}>{`纬度 = ${latitude}, 经度 = ${longitude}`}</Text>
        		</View>
        		<View style={styles.controlContainer}>
			        <View style={{flex:1,alignItems:"center"}}>
			            <TouchableHighlight style={styles.btnStart} underlayColor="#eee" onPress={()=> this.start()}>
			              <Text style={styles.btnStartText}>开始</Text>
			            </TouchableHighlight>
			        </View>
			    </View>
  			</View>
  			);
	}
}

var styles = StyleSheet.create({
	faceContainer:{
		paddingTop: 50, paddingLeft: 30, paddingRight:30, paddingBottom:40,
		backgroundColor: "#fff",
		borderBottomWidth: 1, borderBottomColor:"#ddd",
		height: 200,
		alignItems:"center",
	    justifyContent:"center"
	},
	faceText:{
		fontSize: 14,
		fontWeight: "100",
		color: "#222",
		paddingLeft:20
	},
	controlContainer:{
	    height: 100,
	    flexDirection:"column",
	    paddingTop: 30, paddingLeft: 60, paddingRight:60, paddingBottom:0,
	    alignItems:"center",
	    justifyContent:"center"
	},
	btnStart:{
	    width: 80,
	    height: 80,
	    borderRadius: 35,
	    backgroundColor:"#0379d5",
	    alignItems:"center",
	    justifyContent:"center"
	},
	btnStartText:{
		color: '#fff',
    	fontSize: 16,
    	backgroundColor:"transparent"
  	},
})

export default AppEventListenerEnhance(RunningView)