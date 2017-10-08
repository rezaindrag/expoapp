import {
	FETCH_TAGS
} from '../types';
import axios from 'axios';

const URL = 'https://100seofactors.com/dmapp-video/wp-json/wp/v2/tags/';

export const fetchTags = () => {
	return (dispatch) => {
		axios.get(`${URL}`)
			.then((response) => {
				dispatch({ type: FETCH_TAGS, payload: response.data })
			})
			.catch((error) => {
				console.log(error);
			});
	}
}
 