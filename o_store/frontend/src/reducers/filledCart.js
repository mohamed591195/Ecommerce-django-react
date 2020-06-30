import { FILL_CART } from '../actions/types';

const initialState = {
    products: null,
    totalPrice: 0,
}

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case FILL_CART:
            return payload;
        default:
            return state;
    }
}