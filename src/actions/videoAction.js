import {
	FETCH_VIDEOS,
	FETCH_VIDEOS_SUCCESS,
	FETCH_VIDEOS_FAIL,
	REFRESH_VIDEOS,
	REFRESH_VIDEOS_SUCCESS,
	REFRESH_VIDEOS_FAIL
} from '../types';
import axios from 'axios';

const SERVER_REQUEST = 'https://100seofactors.com/dmapp-video/wp-json/wp/v2/';

export const fetchVideos = () => {
	return (dispatch) => {
		dispatch({ type: FETCH_VIDEOS });

		axios.get(`${SERVER_REQUEST}posts`)
			.then((response) => {
				dispatch({ type: FETCH_VIDEOS_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: FETCH_VIDEOS_FAIL, payload: error.message });
			});
	}
}

export const refreshVideos = () => {
	return (dispatch) => {
		dispatch({ type: REFRESH_VIDEOS });

		axios.get(`${SERVER_REQUEST}posts`)
			.then((response) => {
				dispatch({ type: REFRESH_VIDEOS_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: REFRESH_VIDEOS_FAIL, payload: error.message });
			});
	}
}
 