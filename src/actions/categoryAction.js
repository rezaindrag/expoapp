import {
	FETCH_CATEGORY,
	FETCH_CATEGORY_SUCCESS,
	FETCH_CATEGORY_FAIL,
	REFRESH_CATEGORY,
	REFRESH_CATEGORY_SUCCESS,
	REFRESH_CATEGORY_FAIL
} from '../types';
import axios from 'axios';

export const fetchCategory = () => {
	return (dispatch) => {
		dispatch({ type: FETCH_CATEGORY });

		axios.get('https://100seofactors.com/dmapp/wp-json/wp/v2/categories')
			.then(function (response) {
				dispatch({
					type: FETCH_CATEGORY_SUCCESS,
					payload: response.data
				});
			})
			.catch(function (error) {
				console.log('error');
				dispatch({
					type: FETCH_CATEGORY_FAIL,
					payload: error.message
				});
			});
		
	};
}

export const refreshCategory = () => {
	return (dispatch) => {
		dispatch({ type: REFRESH_CATEGORY });

		axios.get('https://100seofactors.com/dmapp/wp-json/wp/v2/categories')
			.then(function (response) {
				dispatch({
					type: REFRESH_CATEGORY_SUCCESS,
					payload: response.data
				});
			})
			.catch(function (error) {
				dispatch({
					type: REFRESH_CATEGORY_FAIL,
					payload: error.message
				});
			});
		
	};
}
