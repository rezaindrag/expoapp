import {
	CHANGE_CONNECTIVITY
} from '../types';

DEFAULT_STATE = {
	isConnected: true
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case CHANGE_CONNECTIVITY:
			return {
				...state,
				isConnected: action.payload
			}
		default:
			return state;
	}
}