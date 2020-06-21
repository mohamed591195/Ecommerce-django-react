import { GET_CATEGORIES } from '../actions/types';

export default function (state = [], { type, payload }) {
    switch (type) {
        case GET_CATEGORIES:
            return payload;
        default:
            return state;
    }
}