/**
 * application storage
 */
'use strict';

import {AsyncStorage} from 'react-native';

export const StorageUser = 'StorageUser';
export const StorageAppCartCookieId = 'StorageAppCartCookieId';

export const clear = () => {
	return AsyncStorage.clear();
}

export const get = (key) => {
	return AsyncStorage.getItem(key).then(value => JSON.parse(value));
}

export const set = (key, value) => {
	return AsyncStorage.setItem(key, JSON.stringify(value));
}

export const remove = (key) => {
	return AsyncStorage.removeItem(key);
}