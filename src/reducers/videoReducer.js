import {
	FETCH_VIDEOS,
	FETCH_VIDEOS_SUCCESS,
	FETCH_VIDEOS_FAIL,
	REFRESH_VIDEOS,
	REFRESH_VIDEOS_SUCCESS,
	REFRESH_VIDEOS_FAIL
} from '../types';

const DEFAULT_STATE = {
	refreshing: false,
	loading: false,
	data: [],
	error: null
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case FETCH_VIDEOS:
			return {
				...state,
				loading: true
			}
		case FETCH_VIDEOS_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				error: null
			}
		case FETCH_VIDEOS_FAIL:
			return {
				...state,
				loading: false,
				data: [],
				error: action.payload
			}
		case REFRESH_VIDEOS:
			return {
				...state,
				refreshing: true
			}
		case REFRESH_VIDEOS_SUCCESS:
			return {
				...state,
				refreshing: false,
				data: action.payload,
				error: null
			}
		case REFRESH_VIDEOS_FAIL:
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