import {
	FETCH_COMMENT
} from '../types';

const DEFAULT_STATE = {
	loading: false,
	data: []
};

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case FETCH_COMMENT:
			return {
				...state,
				data: action.payload
			}
		default:
			return state;
	}
}