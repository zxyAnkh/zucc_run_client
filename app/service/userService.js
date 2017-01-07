/**
 * user service
 */
'use strict';

import async from 'async';
import * as urls from '../common/urls';
import * as types from '../common/types';
import * as Storage from '../common/storage';
import Util from '../common/utils';
import {
	AsyncStorage
} from 'react-native';
import {
	ToastAndroid,
} from 'react-native';

export let auth = (no, pwd) => {
	let url = urls.urlLogin;
	let data = 'userno=' + no.toString() + '&password=' + pwd.toString();
	// form data = userno=?&password=?
	return no === '31301100' && pwd === '123' ? true : false;

	// 31301100 run data = 
	// {uid:9, rid:4, userno:'31301100', username:'student1', usergrade:13, userbranch:1, meter:2000, time:842, starttime:'Jul 4, 2016 9:28:45 PM', endtime:'Jul 4, 2016 9:42:47 PM'},
	// {uid:9, rid:8, userno:'31301100', username:'student1', usergrade:13, userbranch:1, meter:2000, time:1563, starttime:'Jul 7, 2016 11:19:47 AM', endtime:'Jul 7, 2016 11:45:50 AM'},
	// {uid:9, rid:10, userno:'31301100', username:'student1', usergrade:13, userbranch:1, meter:2000.95, time:1020, starttime:'Dec 3, 2016 4:00:00 PM', endtime:'Dec 3, 2016 4:17:00 PM'},
	// {uid:9, rid:11, userno:'31301100', username:'student1', usergrade:13, userbranch:1, meter:2000, time:725, starttime:'Dec 4, 2016 2:39:00 PM', endtime:'Dec 4, 2016 2:51:05 PM'}

	// return (
	// 	Util.postform(url, data, (responseJson) => {
	// 		if (responseJson.logined === true) {
	// 			let user = {};
	// 			user.no = no;
	// 			user.pwd = pwd;
	// 			Storage.set("loginstate", {
	// 				"state": true
	// 			});
	// 			Storage.set("user", user);
	// 			return true;
	// 		}
	// 		return false;
	// 	}, (err) => {
	// 		console.log(err);
	// 		return false;
	// 	})
	// );
};