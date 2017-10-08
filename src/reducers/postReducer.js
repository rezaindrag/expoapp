import {
	FETCH_POST,
	FETCH_POST_SUCCESS,
	FETCH_POST_FAIL,
	REFRESH_POST,
	REFRESH_POST_SUCCESS,
	REFRESH_POST_FAIL
} from '../types';

const DEFAULT_STATE = {
	refreshing: false,
	loading: false,
	data: [],
	error: null
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case FETCH_POST:
			return {
				...state,
				loading: true
			}
		case FETCH_POST_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				error: null,
			}
		case FETCH_POST_FAIL:
			return {
				...state,
				loading: false,
				data: [],
				error: action.payload
			}
		case REFRESH_POST:
			return {
				...state,
				refreshing: true
			}
		case REFRESH_POST_SUCCESS:
			return {
				...state,
				refreshing: false,
				data: action.payload,
				error: null,
			}
		case REFRESH_POST_FAIL:
			return {
				...state,
				refreshing: false,
				data: [],
				error: action.payload
			}
		default:
			return state;
	}
}