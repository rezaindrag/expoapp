import {
	FETCH_TAGS
} from '../types';

const DEFAULT_STATE = {
	loading: false,
	data: [],
	error: null
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case FETCH_TAGS:
			return {
				...state,
				data: action.payload
			}
		default:
			return state;
	}
}