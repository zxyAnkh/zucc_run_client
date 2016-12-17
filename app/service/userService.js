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
	ToastAndroid,
} from 'react-native';

export let auth = (no, pwd) => {
	let url = urls.urlLogin;
	let data = 'userno=' + no.toString() + '&password=' + pwd.toString();
	// form data = userno=?&password=?
	// return no === '12345678' && pwd === '1' ? true : false;

	return (
		Util.postform(url, data, (responseJson) => {
			// console.log(responseJson);
			for(var i = 0; i < responseJson.length; i++){
				console.log(responseJson[i]);
			}
			true;
		}, (err) => {
			console.log(err);
			false;
		})
	);
};