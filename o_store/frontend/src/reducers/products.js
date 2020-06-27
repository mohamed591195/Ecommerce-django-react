import {
    GET_ALL_PRODUCTS,
    GET_NEXT_PRODUCTS,
    GET_CATEGORY_PRODUCTS,
    SET_SEARCH_QUERY,
    GET_PRODUCT_DETAIL,
} from '../actions/types';

const initialState = {
    results: [],
    next: null,
    previous: null,
    currentProduct: null,
    query: null
}

export default function (state = initialState, { type, payload }) {
    switch (type) {

        case GET_ALL_PRODUCTS:
            return payload;

        case GET_NEXT_PRODUCTS:
            return {
                ...payload,
                results: [...state.results, ...payload.results]
            }

        case GET_CATEGORY_PRODUCTS:
            return payload;

        case SET_SEARCH_QUERY:
            return {
                ...state,
                query: payload
            };

        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                currentProduct: payload
            }

        default:
            return state;
    }
}