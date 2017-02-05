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
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class RunningView extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			started: false,
			stoped: false,
			initialTime: 0,
			currentTime: 0,
			totalTime: '00:00:00',
			totalMeter: '0000.00m',
		}
	}

  	componentDidMount() {
  	}

  	componentWillUnMount() {
  		this.stop();
  	}
    
  	start(){
  		if(!this.state.stoped){
	  		this.setState({
	  			started: true,
	  			initialTime: (new Date()).getTime()
	  		})
	  		let second, minute, countingTime;
		    let interval = setInterval(
		        () => { 
		          this.setState({
		            currentTime: (new Date()).getTime(),
		            location: loction,
		          })
		          countingTime = this.state.currentTime - this.state.initialTime;
		          minute = Math.floor(countingTime/(60*1000));
		          second = Math.floor((countingTime-6000*minute)/1000);
		          this.setState({
		            totalTime: "00:"+(minute<10? "0"+minute:minute)+":"+(second<10? "0"+second:second),
		          })
		          if (this.state.stoped) {
		            clearInterval(interval)
		          };
		        },1000);
  			}
  	}

  	stop(){
  		this.setState({
  			stoped: true,
  		})
  	}

	backToHome(){
		this.stop();
		this.props.navigator.pop();
	}

	render(){
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
        			<Text style={styles.faceText}>{this.state.totalTime}</Text>
        			<Text style={styles.faceText}>{this.state.totalMeter}</Text>
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
	    flexDirection:"row",
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