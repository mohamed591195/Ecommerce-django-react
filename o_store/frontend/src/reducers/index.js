import { combineReducers } from 'redux';
import categories from './categories';
import products from './products';
import baseCart from './baseCart';
import filledCart from './filledCart';
import auth from './auth';



export default combineReducers({
    categories,
    products,
    baseCart,
    filledCart,
    auth
});