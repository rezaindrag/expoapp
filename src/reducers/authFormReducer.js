import {
	INPUT_CHANGE,
	INPUT_RESET,
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	RESET_SUCCESS
} from '../types';

const DEFAULT_STATE = {
	fullName: '',
	email: '',
	password: '',
	confirmPassword: '',
	oldPassword: ''
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case INPUT_CHANGE:
			return {
				...state,
				[action.payload.props]: action.payload.value
			}
		case INPUT_RESET:
			return {
				...state,
				fullName: '',
				email: '',
				password: '',
				confirmPassword: '',
				oldPassword: ''
			}
		case REGISTER_SUCCESS:
			return {
				...state,
				fullName: '',
				email: '',
				password: '',
				confirmPassword: ''
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				email: '',
				password: ''
			}
		case RESET_SUCCESS:
			return {
				...state,
				email: ''
			}
		default:
			return state;
	}
}
