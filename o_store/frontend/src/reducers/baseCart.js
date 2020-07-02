import {
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    UPDATE_CART_PRODUCT_QUANTITY
} from '../actions/types';


// initialing the application will get the old cart object from the localstorage
const initialState = JSON.parse(localStorage.getItem('cartState')) || {};

// presist cart object in the localStorage so we keep it if he closed the browser
const presistCart = newState => localStorage.setItem('cartState', JSON.stringify(newState));

// Reducer starts here
export default function (state = initialState, { type, payload }) {

    let newState = {};

    switch (type) {

        case ADD_PRODUCT_TO_CART:

            const productId = payload;

            newState = {
                ...state,
                [productId]: state[productId] ? state[productId] + 1 : 1,
            }

            presistCart(newState)

            return newState

        case REMOVE_PRODUCT_FROM_CART:

            newState = { ...state }

            delete newState[payload]

            presistCart(newState)

            return newState

        case UPDATE_CART_PRODUCT_QUANTITY:

            const [id, quantity] = payload;

            newState = {
                ...state,
                [id]: parseInt(quantity),
            }

            presistCart(newState);

            return newState;

        default:
            return state
    }
}