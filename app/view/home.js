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
}from 'react-native';

export default class HomeView extends React.Component{
	constructor(props) {
	  super(props);

	  this.state = {
	  	dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        		getRowData: (data, rowID) => {
        			return dataSource[rowID];
        		},
        })
	  };
	}

	  componentDidMount(){

    }

  	componentWillUnMount(){
    
  	}

  	// get data from server
  	_fetchData(){
  		return {
  			'no':{1:'1', 2:'2', 3:'3'},
  		 	'time':{1:'2016-06-01', 2:'2016-06-02', 3:'2016-06-03'},
  		 	'cost':{1:'12:45', 2:'13:05', 3:'12:56'}
  		};
  	}

  	_refreshList(){

  	}

  	_renderRow(item){
  		return (<Text>{item}</Text>);
  	}

  	_renderHeader(){
  		return (
  			<Text>no.    time    cost</Text>
  			);
  	}

	  render(){
		  return (
			  <View>
				  <Text>hello world.</Text>
			  </View>
			);
	  }
}