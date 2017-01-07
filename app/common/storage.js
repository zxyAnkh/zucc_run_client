/**
 * application storage
 */
'use strict';

import {AsyncStorage} from 'react-native';

export const clear = () => {
	return AsyncStorage.clear();
}

export const get = (key) => {
	return AsyncStorage.getItem(key).then(value => JSON.parse(value));
}

export const set = (key, value) => {
	AsyncStorage.setItem(key, JSON.stringify(value));
}

export const remove = (key) => {
	return AsyncStorage.removeItem(key);
}