import {
	FETCH_USER,
	OPEN_UPGRADE_ACCOUNT_MODAL,
	CLOSE_UPGRADE_ACCOUNT_MODAL,
	OPEN_PAYMENT_CONFIRMATION_MODAL,
	CLOSE_PAYMENT_CONFIRMATION_MODAL
} from '../types';
import firebase from 'firebase';

export const fetchUser = (uid) => {
	return (dispatch) => {
		firebase.database().ref('users/' + uid)
			.on('value', function(snapshot) {
		  		dispatch({ type: FETCH_USER, payload: snapshot.val() });
			});
	}
}

export const openUpgradeAccountModal = () => {
	return (dispatch) => {
  		dispatch({ type: OPEN_UPGRADE_ACCOUNT_MODAL });
	}
}

export const closeUpgradeAccountModal = () => {
	return (dispatch) => {
  		dispatch({ type: CLOSE_UPGRADE_ACCOUNT_MODAL });
	}
}

export const openPaymentConfirmationModal = () => {
	return (dispatch) => {
  		dispatch({ type: OPEN_PAYMENT_CONFIRMATION_MODAL });
	}
}

export const closePaymentConfirmationModal = () => {
	return (dispatch) => {
  		dispatch({ type: CLOSE_PAYMENT_CONFIRMATION_MODAL });
	}
}
