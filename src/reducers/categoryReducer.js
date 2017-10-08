import {
	FETCH_CATEGORY,
	FETCH_CATEGORY_SUCCESS,
	FETCH_CATEGORY_FAIL,
	REFRESH_CATEGORY,
	REFRESH_CATEGORY_SUCCESS,
	REFRESH_CATEGORY_FAIL
} from '../types';

const DEFAULT_STATE = {
	loading: false,
	loadingRefresh: false,
	error: null,
	data: []
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case FETCH_CATEGORY:
			return {
				...state,
				loading: true
			};
		case FETCH_CATEGORY_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				error: null
			};
		case FETCH_CATEGORY_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
				data: []
			};
		case REFRESH_CATEGORY:
			return {
				...state,
				loadingRefresh: true
			};
		case REFRESH_CATEGORY_SUCCESS:
			return {
				...state,
				loadingRefresh: false,
				data: action.payload,
				error: null
			};
		case REFRESH_CATEGORY_FAIL:
			return {
				...state,
				loadingRefresh: false,
				error: action.payload,
				data: []
			};
		default:
			return state;
	}
}