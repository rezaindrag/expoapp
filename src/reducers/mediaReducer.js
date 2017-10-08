import {
	FETCH_MEDIA
} from '../types';

const DEFAULT_STATE = {
	data: []
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case FETCH_MEDIA:
			return {
				...state,
				data: action.payload
			}
		default:
			return state;
	}
}