import {
	FETCH_MEDIA
} from '../types';
import axios from 'axios';

export const fetchMedia = () => {
	return (dispacth) => {
		axios.get(`https://100seofactors.com/dmapp/wp-json/wp/v2/media?per_page=100`)
			.then(function (response) {
				dispacth({
					type: FETCH_MEDIA,
					payload: response.data
				});
			})
			.catch(function (error) {
				console.log(error);
			});
		
	};
}
