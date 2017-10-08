import {
	CHANGE_SCREEN
} from '../types';

export const changeScreen = (screen) => {
	return (dispatch) => {
		dispatch({ type: CHANGE_SCREEN, payload: screen });
	}
}