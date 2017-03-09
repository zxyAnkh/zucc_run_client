/**
 * user service
 */
'use strict';

import async from 'async';
import * as urls from '../common/urls';
import Util from '../common/utils';
import * as Storage from '../common/storage';

export let auth = (no, pwd) => {
	let url = urls.urlLogin;
	let data = 'userno=' + no.toString() + '&password=' + pwd.toString();
	// if(no === '31301100' && pwd === '123'){
	// 	Storage.set('loginstate', {'state': true}, 1000 * 3600 * 24 * 7);
	// 	Storage.set('user', {'no': no, 'password': pwd}, 1000 * 3600 * 24 * 7);
	// }

	Util.postform(url, data, (responseJson) => {
		if (responseJson.logined === true) {
			Storage.set('loginstate', {'state': true}, 1000 * 3600 * 24 * 7);
			Storage.set('user', {'no': no, 'password': pwd}, 1000 * 3600 * 24 * 7);
		}else{
			Storage.set('loginstate', {'state': false}, 1000 * 3600 * 24 * 7);
			Storage.set('user', {'no': "", 'password': ""}, 1000 * 3600 * 24 * 7);
		}
	}, (err) => {
		console.log(err);
		Storage.set('loginstate', {'state': false}, 1000 * 3600 * 24 * 7);
		Storage.set('user', {'no': "", 'password': ""}, 1000 * 3600 * 24 * 7);
	})	
};

export let logout = () => {
	let url = urls.urlLogout;
	let data = '';

	Util.post(url, data, (responseJson) => {
		Storage.set('loginstate', {'state': false}, 1000 * 3600 * 24 * 7);
		Storage.set('user', {'no': '', 'password': ''}, 1000 * 3600 * 24 * 7);
	}, (err) => {
		Storage.set('loginstate', {'state': false}, 1000 * 3600 * 24 * 7);
		Storage.set('user', {'no': "", 'password': ""}, 1000 * 3600 * 24 * 7);
	})
}

export let update = (no, oldpwd, newpwd) => {
	let url = urls.urlUpdate;
	let data = 'no=' + no.toString() + '&oldpwd=' + oldpwd.toString() + '&newpwd=' + newpwd.toString();
	
	Util.postform(url, data, (responseJson) => {
		console.log("update user password resposne: " , responseJson);
		if (responseJson !== null && responseJson.result === true) {
            Storage.set('user', {'no': no, 'password': newpwd}, 1000 * 3600 * 24 * 7);
            Storage.set('loginstate', {'state': false}, 1000 * 3600 * 24 * 7);
		}
	}, (err) => {
		console.log(err);
	})
}

export let addrun = (no, meter, stime, etime) => {
	let url = urls.urlAddRun;
	let data = 'sno=' + no.toString() + '&meter=' + meter.toString() + '&stime=' + stime.toString() + '&etime=' + etime.toString();

	Util.postform(url, data, (responseJson) => {
		if(responseJson !== null && responseJson.result === true){
			addRun2Storage(no, meter, stime, etime);
		}
		}, (err) => {
	})
}

export let loadrun = (no) => {
	let url = urls.urlLoadRun + '?no=' + no.toString();

	Util.get(url, (responseJson) => {
		if(responseJson !== null && responseJson.data !== null){
			for(let i = 0; i < responseJson.data.length; i++){
				delete responseJson.data[i].id;
			}
			Storage.set('run', responseJson, 1000 * 3600 * 24 * 31);
		}
	}, (err) => {}
	);
}

function addRun2Storage(no, meter, stime, etime){
	console.log('add run to storage.', no, meter, stime, etime);
	Storage.get("run").then(ret => {
		let data = ret.data;
		data.push({
			sno: no,
	        meter: meter,
	        time: (etime-stime)/1000,
	        stime: stime,
	        etime: etime
		});
		Storage.set("run", data, 1000 * 3600 * 24 * 31);
		Storage.set('addRunResult', {'result': true}, 1000 * 60);
	});
}