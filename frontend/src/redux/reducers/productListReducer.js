import { PRODUCT_TYPES } from "../types";

const initialState = {
	products: [],
	product: {
		reviews: []
	}
};

export const productListReducer = (state = initialState, action) => {
  switch (action.type) {
		case PRODUCT_TYPES.PRODUCT_LIST_REQUEST:
			return {
				loading: true,
				products: state.products,
			};
		case PRODUCT_TYPES.PRODUCT_LIST_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case PRODUCT_TYPES.PRODUCT_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const productDetailsReducer = (state = {product: {reviews: []}}, action) => {
	switch (action.type) {
		case PRODUCT_TYPES.PRODUCT_DETAILS_REQUEST:
			return {
				loading: true,
				...state
			};
		case PRODUCT_TYPES.PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload,
			};
		case PRODUCT_TYPES.PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};