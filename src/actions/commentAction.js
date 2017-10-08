import {
	FETCH_COMMENT
} from '../types';
import axios from 'axios';

export const fetchComments = () => {
	
	return (dispatch) => {
		axios.get(`https://100seofactors.com/dmapp/wp-json/wp/v2/comments/`)
			.then(response => {
				dispatch({
					type: FETCH_COMMENT,
					payload: response.data
				})
			})
			.catch(err => {
				console.log(err);
			});
	}

}