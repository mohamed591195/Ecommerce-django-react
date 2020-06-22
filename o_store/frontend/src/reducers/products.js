import {
    GET_ALL_PRODUCTS,
    GET_NEXT_PRODUCTS,
    GET_CATEGORY_PRODUCTS,
    GET_SEARCH_RESULT,
} from '../actions/types';

const initialState = {
    results: [],
    next: null,
    previous: null,
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

        case GET_SEARCH_RESULT:
            return payload;

        default:
            return state;
    }
}