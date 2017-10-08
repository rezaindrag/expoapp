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
	INPUT_CHANGE,
	INPUT_RESET,
	REGISTER_PROCESS,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	FETCH_USER,
	STOP_PROCESS,
	RESET_FAILED,
	RESET_PROCESS,
	RESET_SUCCESS
} from '../types';
import firebase from 'firebase';
import api from '../api';

export const openAuthLoginModal = () => {
	return (dispatch) => {
		dispatch({
			type: OPEN_AUTH_LOGIN_MODAL
		});
	}
}

export const openAuthRegisterModal = () => {
	return (dispatch) => {
		dispatch({
			type: OPEN_AUTH_REGISTER_MODAL
		});
	}
}

export const closeAuthModal = () => {
	return (dispatch) => {
		dispatch({
			type: CLOSE_AUTH_MODAL
		});
	}
}

export const showForm = (form) => {
	return (dispatch) => {
		if (form === 'login') {
			dispatch({ type: SHOW_FORM_LOGIN });
		} else if(form === 'register') {
			dispatch({ type: SHOW_FORM_REGISTER });
		} else {
			dispatch({ type: SHOW_FORM_LOST_PASSWORD });
		}
	}
}

export const inputChange = ({ props, value }) => {
	return (dispatch) => {
		dispatch({
			type: INPUT_CHANGE,
			payload: { props, value }
		});
	}
}

export const stopAuthProcess = () => {
	return (dispatch) => {
		dispatch({
			type: STOP_PROCESS
		});
	}
}

export const inputReset = () => {
	return (dispatch) => {
		dispatch({
			type: INPUT_RESET
		});
	}
}

export const doRegister = ({ fullName, email, password, confirmPassword }) => {
	return (dispatch) => {
		const errors = [];

		if (fullName.length === 0) {
			errors.push("Nama Lengkap tidak boleh kosong.");
		}

		if (email.length === 0) {
			errors.push("Email tidak boleh kosong.");
		} else {
			if ( ! api.validateEmail(email)) {
				errors.push("Email tidak valid.");
			} 
		}
		
		if (password.length === 0) {
			errors.push("Password tidak boleh kosong.");
		} else {
			if (password.length < 6) {
				errors.push("Password minimal 6 karakter.");
			} else {
				if (confirmPassword.length !== 0) {
					if (confirmPassword.length < 6) {
						errors.push("Konfirmasi Password minimal 6 karakter.");
					} else {
						if (password !== confirmPassword) {
							errors.push("Password tidak sesuai dengan Konfirmasi Password.");
						}
					}
				}
			}
		}

		if (confirmPassword.length === 0) {
			errors.push("Konfirmasi Password tidak boleh kosong.");
		}

		if (errors.length > 0) {
			dispatch({ type: REGISTER_FAILED, payload: errors });
		} else {
			dispatch({ type: REGISTER_PROCESS });

			firebase.auth().createUserWithEmailAndPassword(email, password)
				.then((user) => {
					addNewUser({ 
						uId: user.uid, 
						fullName, 
						email, 
						profilePicture: "", 
						active: 0 
					});

					dispatch({ type: REGISTER_SUCCESS, payload: user });
				})
				.catch(function(error) {
					if (error.code === 'auth/email-already-in-use') {
						dispatch({ type: LOGIN_FAILED, payload: ['Email ini sudah pernah digunakan.'] });
					} else {
						dispatch({ type: LOGIN_FAILED, payload: [error.message] });
					}
				});
		}

	}
}

export const doLogin = ({ email, password }) => {
	return (dispatch) => {
		const errors = [];

		// email validation
		if (email.length === 0) {
			errors.push("Email tidak boleh kosong.");
		} else {
			if ( ! api.validateEmail(email)) {
				errors.push("Email tidak valid.");
			} 
		}
		// password validation
		if (password.length === 0) {
			errors.push("Password tidak boleh kosong.");
		} else {
			if (password.length < 6) {
				errors.push("Password minimal 6 karakter.");
			}
		}
		// check is error empty
		if (errors.length > 0) {
			dispatch({ type: LOGIN_FAILED, payload: errors });
		} else {
			dispatch({ type: LOGIN_PROCESS });

			firebase.auth().signInWithEmailAndPassword(email, password)
				.then((user) => {
					dispatch({ type: LOGIN_SUCCESS, payload: user });
				})
				.catch((error) => {
					if (error.code === 'auth/user-not-found') {
						dispatch({ type: LOGIN_FAILED, payload: ['User tidak terdaftar, silahkan coba lagi!'] });
					} else if (error.code === 'auth/wrong-password') {
						dispatch({ type: LOGIN_FAILED, payload: ['Password salah, silahkan coba lagi!'] });
					} else {
						dispatch({ type: LOGIN_FAILED, payload: [error.message] });
					}
				});
		}
	}
}

export const doLogout = () => {
	return (dispatch) => {
		firebase.auth().signOut()
			.catch((error) => {
		  		console.log(error);
			});
	}
}

export const doResetPassword = ({ email }) => {
	return (dispatch) => {
		const errors = [];

		// email validation
		if (email.length === 0) {
			errors.push("Email tidak boleh kosong.");
		} else {
			if ( ! api.validateEmail(email)) {
				errors.push("Email tidak valid.");
			} 
		}

		if (errors.length > 0) {
			dispatch({ type: RESET_FAILED, payload: errors });
		} else {
			dispatch({ type: RESET_PROCESS });
			
			firebase.auth().languageCode = 'id';
			firebase.auth().sendPasswordResetEmail(email).then(() => {
				// Email sent.
				dispatch({ type: RESET_SUCCESS, payload: 'Silahkan cek email anda!' });
			}).catch(function(error) {
				console.log(error.code);
				dispatch({ type: RESET_FAILED, payload: [error.message] });
			});
		}
	}
}

// next version
export const doLoginWithGoogle = () => {
	return (dispatch) => {
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().languageCode = 'id';

		firebase.auth().signInWithPopup(provider).then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			var token = result.credential.accessToken;
			console.log(token);
			// The signed-in user info.
			var user = result.user;
			console.log(user);
			// ...
		}).catch((error) => {
			// Handle Errors here.
			console.log(error);
		});
	}
	
}

export const doLoginWithFacebook = () => {
	
}

export const checkIsAuthenticated = () => {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				dispatch({ type: HAS_LOGGED_IN, payload: user });
				firebase.database().ref('users/' + user.uid)
					.once('value')
						.then((snapshot) => {
					  		dispatch({ type: FETCH_USER, payload: snapshot.val() });
						});
			} else {
				dispatch({ type: HAS_NOT_LOGGED_IN });
			}
		});
	}
}

const addNewUser = ({ uId, fullName, email, profilePicture, active }) => {
	firebase.database().ref('users/' + uId).set({ 
		fullName, 
		email, 
		profilePicture, 
		active 
	});
}