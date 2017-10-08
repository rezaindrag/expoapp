import { combineReducers } from 'redux';
import category from './categoryReducer';
import post from './postReducer';
import media from './mediaReducer';
import comment from './commentReducer';
import auth from './authReducer';
import authForm from './authFormReducer';
import user from './userReducer';
import nav from './navReducer';
import video from './videoReducer';
import tag from './tagReducer';
import net from './netReducer';

export default combineReducers({
	category,
	post,
	media,
	comment,
	auth,
	authForm,
	user,
	nav,
	video,
	tag,
	net
});