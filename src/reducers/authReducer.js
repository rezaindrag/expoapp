import {
	OPEN_AUTH_LOGIN_MODAL,
	OPEN_AUTH_REGISTER_MODAL,
	CLOSE_AUTH_MODAL,
	LOGIN_PROCESS,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	HAS_LOGGED_IN,
	HAS_NOT_LOGGED_IN,
	SHOW_FORM_REGISTER,
	SHOW_FORM_LOGIN,
	SHOW_FORM_LOST_PASSWORD,
	REGISTER_PROCESS,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	STOP_PROCESS,
	RESET_FAILED,
	RESET_PROCESS,
	RESET_SUCCESS
} from '../types';

const DEFAULT_STATE = {
	visibleLoginModal: false,
	loading: false,
	userId: null,
	errors: [],
	hasLogin: false,
	form: 'login',
	message: ''
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case OPEN_AUTH_LOGIN_MODAL:
			return {
				...state,
				visibleLoginModal: true,
				errors: [],
				message: ''
			}
		case CLOSE_AUTH_MODAL:
			return {
				...state,
				visibleLoginModal: false,
				errors: [],
				message: ''
			}
		case LOGIN_PROCESS:
			return {
				...state,
				loading: true,
				errors: [],
				message: ''
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				userId: action.payload.uid,
				visibleLoginModal: false,
				hasLogin: true,
				errors: [],
				message: ''
			}
		case LOGIN_FAILED:
			return {
				...state,
				loading: false,
				errors: [
					...action.payload
				],
				message: ''
			}
		case HAS_LOGGED_IN:
			return {
				...state,
				hasLogin: true,
				userId: action.payload.uid,
				errors: [],
				message: ''
			}
		case HAS_NOT_LOGGED_IN:
			return {
				...state,
				hasLogin: false,
				userId: null,
				errors: [],
				message: ''
			}
		case SHOW_FORM_REGISTER:
			return {
				...state,
				form: 'register',
				errors: [],
				message: ''
			}
		case SHOW_FORM_LOGIN:
			return {
				...state,
				form: 'login',
				errors: [],
				message: ''
			}
		case SHOW_FORM_LOST_PASSWORD:
			return {
				...state,
				form: 'lostPassword',
				errors: [],
				message: ''
			}
		case REGISTER_PROCESS:
			return {
				...state,
				loading: true,
				errors: [],
				message: ''
			}
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				visibleLoginModal: false,
				userId: action.payload.uid,
				hasLogin: true,
				errors: [],
				message: ''
			}
		case REGISTER_FAILED:
			return {
				...state,
				loading: false,
				errors: [
					...action.payload
				],
				message: ''
			}
		case RESET_PROCESS:
			return {
				...state,
				loading: true,
				errors: [],
				message: ''
			}
		case RESET_SUCCESS:
			return {
				...state,
				loading: false,
				errors: [],
				message: action.payload
			}
		case RESET_FAILED:
			return {
				...state,
				loading: false,
				errors: [
					...action.payload
				],
				message: ''
			}
		case STOP_PROCESS:
			return {
				...state,
				loading: false,
				errors: [],
				message: ''
			}
		default:
			return state;
	}
}