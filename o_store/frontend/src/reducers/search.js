import { GET_SEARCH_RESULT } from '../actions/types';

export default function (state = [], { type, payload }) {
    switch (type) {
        case GET_SEARCH_RESULT:
            return payload;
        default:
            return state;
    }
}