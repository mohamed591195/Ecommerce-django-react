import { GET_ALL_PRODUCTS } from '../actions/types';


export default function (state = [], { type, payload }) {
    switch (type) {
        case GET_ALL_PRODUCTS:
            return payload
        default:
            return state;
    }
}