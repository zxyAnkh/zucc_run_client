/**
 * application storage
 */
'use strict';

import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

var async = require('async');
var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000*3600*24*31,
	enableCache: true,
	sync:{
		
	}
})

global.storage = storage;

export const clear = () => {
	console.log('clear storage.');
	storage.clearMap();
}

export const get = (k) => {
	return storage.load({
			key: k,
			autoSync: false,
			syncInBackground: false
		}).then(ret => {
			console.log(JSON.stringify(ret) + " get from storage");
			return ret;
		}).catch(err => {
			console.log(err);
			return JSON.parse('{"error":"load from storage error"}');
		});
}

export const set = (k, v, e) => {
	console.log('set key value. ' + k + ' ' + JSON.stringify(v) + ' ' + e);
	storage.save({
		key: k,
		rawData: v,
		expires: e
	});
}

export const remove = (k) => {
	console.log('remove ' + k);
	storage.remove({
		key: k
	});
}
