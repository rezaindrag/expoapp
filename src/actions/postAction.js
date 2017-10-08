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

export const fetchPost = () => {
	return (dispacth) => {
		dispacth({ type: FETCH_POST });

		axios.get(`${SERVER_REQUEST}posts`)
			.then((response) => {
				dispacth({
					type: FETCH_POST_SUCCESS,
					payload: response.data
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

export const refreshPost = () => {
	return (dispacth) => {
		dispacth({ type: REFRESH_POST });

		axios.get(`${SERVER_REQUEST}posts`)
			.then((response) => {
				dispacth({
					type: REFRESH_POST_SUCCESS,
					payload: response.data
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
