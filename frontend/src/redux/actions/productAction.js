import { PRODUCT_TYPES } from '../types';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_TYPES.PRODUCT_LIST_REQUEST,
		});

		const { data } = await axios.get('https://smartsmith-backend.vercel.app/api/products');

		// console.log('data>>>>>', data);

		dispatch({
			type: PRODUCT_TYPES.PRODUCT_LIST_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		console.log(err.message);
		dispatch({
			type: PRODUCT_TYPES.PRODUCT_LIST_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({
			type: PRODUCT_TYPES.PRODUCT_DETAILS_REQUEST,
		});

		const { data } = await axios.get(
			`https://smartsmith-backend.vercel.app/api/products/${id}`,
		);

		// console.log('datails data>>>>>', data);

		dispatch({
			type: PRODUCT_TYPES.PRODUCT_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		console.log(err.message);
		dispatch({
			type: PRODUCT_TYPES.PRODUCT_DETAILS_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};
