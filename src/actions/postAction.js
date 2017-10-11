import {
	FETCH_POST,
	FETCH_POST_SUCCESS,
	FETCH_POST_FAIL,
	REFRESH_POST,
	REFRESH_POST_SUCCESS,
	REFRESH_POST_FAIL
} from '../types';
import axios from 'axios';

const SERVER_REQUEST = 'https://100seofactors.com/dmapp/wp-json/wp/v2/';

export const fetchPost = (limit = 50) => {
	return (dispacth) => {
		dispacth({ type: FETCH_POST });

		axios.get(`${SERVER_REQUEST}posts`)
			.then((response) => {
				const dataPost = [];
				const responseData = response.data;
				for (i = 0; i < responseData.length; i++) {
					if (limit) {
						if (i < limit) {
							dataPost.push(responseData[i]);
						}
					} else {
						dataPost.push(responseData[i]);
					}
				}

				dispacth({
					type: FETCH_POST_SUCCESS,
					payload: dataPost
				});
			})
			.catch((error) => {
				dispacth({
					type: FETCH_POST_FAIL,
					payload: error.message
				});
			});
	};
}

export const refreshPost = (limit = 50) => {
	return (dispacth) => {
		dispacth({ type: REFRESH_POST });

		axios.get(`${SERVER_REQUEST}posts`)
			.then((response) => {
				const dataPost = [];
				const responseData = response.data;
				for (i = 0; i < responseData.length; i++) {
					if (limit) {
						if (i < limit) {
							dataPost.push(responseData[i]);
						}
					} else {
						dataPost.push(responseData[i]);
					}
				}

				dispacth({
					type: REFRESH_POST_SUCCESS,
					payload: dataPost
				});
			})
			.catch((error) => {
				dispacth({
					type: REFRESH_POST_FAIL,
					payload: error.message
				});
			});
	};
}
