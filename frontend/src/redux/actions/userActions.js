import { USER_TYPES } from '../types';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api/auth' });

API.interceptors.request.use((req) => {
	if (localStorage.getItem('jwt')) {
		req.headers['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
	}

	return req;
});

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_TYPES.USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'http://localhost:5000/api/auth/login',
			{ email, password },
			config,
		);

		console.log('login>>>', data);

		dispatch({
			type: USER_TYPES.USER_LOGIN_SUCCESS,
			payload: data.data,
		});

		localStorage.setItem('jwt', data.token);
		localStorage.setItem('users', JSON.stringify(data.data));
	} catch (err) {
		dispatch({
			type: USER_TYPES.USER_LOGIN_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem('users');
	dispatch({ type: USER_TYPES.USER_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_TYPES.USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'http://localhost:5000/api/auth/register',
			{ name, email, password },
			config,
		);

		console.log('register>>>', data);

		dispatch({
			type: USER_TYPES.USER_REGISTER_SUCCESS,
			payload: data.data,
		});

		dispatch({
			type: USER_TYPES.USER_LOGIN_SUCCESS,
			payload: data.data,
		});

		localStorage.setItem('users', JSON.stringify(data.data));
	} catch (err) {
		dispatch({
			type: USER_TYPES.USER_REGISTER_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};



export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_TYPES.USER_DETAILS_REQUEST,
		});

		const {
			loginUser: { token },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await API.get(`/users/${id}`);

		console.log('user profile>>>', data);

		dispatch({
			type: USER_TYPES.USER_DETAILS_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: USER_TYPES.USER_DETAILS_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_TYPES.USER_UPDATE_PROFILE_REQUEST,
		});

		// const {
		// 	loginUser: { users },
		// } = getState();

		// const config = {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${token}`,
		// 	},
		// };

		const { data } = await API.put(`/users/profile`, user);

		console.log('user profile update>>>', data);

		dispatch({
      type: USER_TYPES.USER_UPDATE_PROFILE_SUCCESS,
			payload: data.data,
		});
	} catch (err) {
		dispatch({
			type: USER_TYPES.USER_UPDATE_PROFILE_FAIL,
			payload:
				err.response && err.response.data.msg
					? err.response.data.msg
					: err.message,
		});
	}
};
