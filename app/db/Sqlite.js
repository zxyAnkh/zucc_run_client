/**
 * sqlite common DAO
 */
'use strict';

import SQLite from 'react-native-sqlite';

var db = SQLite.open('run.sqlite');

function BaseDb(dbname) {
	this.dbname = dbname;
}

BaseDb.prototype.insert = function(data, callback) {
	var me = this;
	var fileds = [];
	var values = [];
	var valuesToken = [];

	for (var field in data) {
		var value = data[field];
		value = me.fixValue(field, value);
		fields.push(field);
		values.push(value);
		valuesToken.push('?');
	}
	var sql = 'INSERT INTO' + me.dbname + '(' + fields.join(',') + ') VALUES (' + valuesToken.join(',') + ')';
	db.executeSQL(sql, values, function() {},
		function aferCb(err) {
			callback(err, data);
		});
};

module.exports = exports;