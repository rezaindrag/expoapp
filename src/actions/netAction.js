import {
	CHANGE_CONNECTIVITY
} from '../types';

export const changeConnectivity = (isConnected) => {
	return (dispatch) => {
		if (isConnected !== 'NONE') {
			dispatch({ type: CHANGE_CONNECTIVITY, payload: true });
		} else {
			dispatch({ type: CHANGE_CONNECTIVITY, payload: false });
		}
	}
}