import { combineReducers } from 'redux';
import {
	productListReducer,
	productDetailsReducer,
} from './productListReducer';
import { cartReducer } from './cartReducer';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './userReducers';
import { orderCreateReducer, orderDetailsReducer,orderPayReducer } from './orderReducer';

const reducers = combineReducers({
	productLists: productListReducer,
  productDetails: productDetailsReducer,
	cart: cartReducer,
	loginUser: userLoginReducer,
	registerUser: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer

});

export default reducers;
