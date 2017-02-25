/**
 * http util
 */
'use strict';

let Util = {
	get: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(responseText);
            })
            .catch((err) => {
                failCallback(err);
            });
	},
	post: (url, data, successCallback, failCallback) => {
		let fetchOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify(data)
		};

		fetch(url, fetchOptions)
			.then((response) => response.text())
            .then((responseText) => {
                let result = JSON.parse(responseText);
                successCallback(result.status, result.code, result.message, result.data, result.share);
            })
            .catch((err) => {
                failCallback(err);
            });
	},
    postform: (url, data, successCallback, failCallback) => {
        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        };

        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((err) => {
                failCallback(err);
            }).done();
    },
}

export default Util;