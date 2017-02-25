/**
 * user service
 */
'use strict';

import async from 'async';
import * as urls from '../common/urls';
import * as types from '../common/types';
import Util from '../common/utils';
import * as Storage from '../common/storage';
import {
	ToastAndroid,
} from 'react-native';

export auth = (no, pwd) => {
	let url = urls.urlLogin;
	let data = 'userno=' + no.toString() + '&password=' + pwd.toString();
	return (no === '31301100' && pwd === '123') ? JSON.parse('{"result": true}') : JSON.parse('{"result": false}');

	// return await Util.postform(url, data, (responseJson) => {
	// 	if (responseJson.logined === true) {
	// 		return JSON.parse('{"result": true}') ;
	// 	}
	// 	return JSON.parse('{"result": false}');
	// }, (err) => {
	// 	console.log(err);
	// 	return JSON.parse('{"result": false}');
	// })
	
};

export let update = (no, pwd) => {
	let url = urls.urlUpdate;
	let data = 'userno=' + no.toString() + '&password=' + pwd.toString();
	return no === '31301100' && pwd === '111' ? JSON.parse('{"result": true}') : JSON.parse('{"result": false}');

	// return (
	// 	Util.postform(url, data, (responseJson) => {
	// 		console.log(responseJson);
	// 		if (responseJson.logined === true) {
	// 			return JSON.parse('{"result": true}');
	// 		}
	// 		return JSON.parse('{"result": false}');
	// 	}, (err) => {
	// 		console.log(err);
	// 		return JSON.parse('{"result": false}');
	// 	})
	// );
}

export let addrun = (no, meter, stime, etime) => {
	let url = urls.urlAddRun;
	let data = 'sno=' + no.toString() + '&meter=' + meter.toString() + '&stime=' + stime.toString() + '&etime=' + etime.toString();

	return (Util.postform(url, data, (responseJson) => {
		if(responseJson === 'SUCCEEDED'){
			// 更新存储的内容
			Storage.get('rundata')
				.then(ret => {
					
				})
			return JSON.parse('{"result": true}');
		}
		return JSON.parse('{"result": false}');
		}, (err) => {
			console.log(err);
			return JSON.parse('{"result": false}');
		})
	);
}