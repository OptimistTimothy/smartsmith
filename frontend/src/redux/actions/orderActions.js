import { ORDER_TYPES } from '../types';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('jwt')) {
		req.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
	}

	return req;
});

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_TYPES.ORDER_CREATE_REQUEST,
		});
		const { data } = await API.post(`/orders/create`, order);

		console.log('orders creating >>>', data);

		dispatch({
			type: ORDER_TYPES.ORDER_CREATE_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_TYPES.ORDER_CREATE_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_TYPES.ORDER_DETAILS_REQUEST,
		});
		const { data } = await API.get(`/orders/${id}`);

		console.log('orders lists >>>', data);

		dispatch({
			type: ORDER_TYPES.ORDER_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: ORDER_TYPES.ORDER_DETAILS_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};

export const payOrder =
	(orderId, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({
				type: ORDER_TYPES.ORDER_PAY_REQUEST,
			});
			const { data } = await API.put(`/orders/${orderId}/pay`, paymentResult);

			console.log('orders payment >>>', data);

			dispatch({
				type: ORDER_TYPES.ORDER_PAY_SUCCESS,
				payload: data.data,
			});
		} catch (err) {
			dispatch({
				type: ORDER_TYPES.ORDER_PAY_FAIL,
				payload:
					err.response && err.response.data.msg
						? err.response.data.msg
						: err.message,
			});
		}
	};
