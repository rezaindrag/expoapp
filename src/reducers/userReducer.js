import {
	FETCH_USER,
	OPEN_UPGRADE_ACCOUNT_MODAL,
	CLOSE_UPGRADE_ACCOUNT_MODAL,
	OPEN_PAYMENT_CONFIRMATION_MODAL,
	CLOSE_PAYMENT_CONFIRMATION_MODAL
} from '../types';

const DEFAULT_STATE = {
	upgradeAccountModal: false,
	paymentConfirmationModal: false,
	active: 0,
 	email: "",
 	fullName: "",
 	profilePicture: ""
}

export default (state = DEFAULT_STATE, action) => {
	switch(action.type) {
		case FETCH_USER:
			const { active, email, fullName, profilePicture } = action.payload;
			return {
				...state,
				active,
			 	email,
			 	fullName,
			 	profilePicture
			}
		case OPEN_UPGRADE_ACCOUNT_MODAL:
			return {
				...state,
				upgradeAccountModal: true
			}
		case CLOSE_UPGRADE_ACCOUNT_MODAL:
			return {
				...state,
				upgradeAccountModal: false
			}
		case OPEN_PAYMENT_CONFIRMATION_MODAL:
			return {
				...state,
				paymentConfirmationModal: true
			}
		case CLOSE_PAYMENT_CONFIRMATION_MODAL:
			return {
				...state,
				paymentConfirmationModal: false
			}
		default:
			return state;
	}
}