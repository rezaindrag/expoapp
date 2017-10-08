import {
	CHANGE_SCREEN
} from '../types';

const DEFAULT_STATE = {
	screen: 'Home'
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case CHANGE_SCREEN:
			return {
				...state,
				screen: action.payload
			}
		default:
			return state;
	}
}