/**
 * user service
 */
'use strict';

import async from 'async';
import * as urls from '../common/urls';
import * as types from '../common/types';
import * as Storage from '../common/storage';
import Util from '../common/utils';

export let auth = (no, pwd) => {
	let url = urls.urlLogin;
	let data = {
		no: no,
		password: pwd
	};
	return no === '12345678' && pwd === '1' ? true : false;
	// return ({
	// 	Util.post(url, data, 
	// 		(status, code, message, data, share) => {
	// 			let user = {};
	// 			if(status){
	// 				user = data.user;
	// 				// get user & run data. storage user & run data.
	// 			}
	// 	},
	// 	(error) => {

	// 	});
	// };
};
