import { GET_CATEGORIES, GET_ALL_PRODUCTS } from './types';
import axios from 'axios';


export const getCategories = () => dispatch => {
    axios.get('/products/api/categories/')
        .then(res => dispatch({ type: GET_CATEGORIES, payload: res.data }))
        .catch(err => console.log(err))
}

export const getAllProducts = () => dispatch => {
    axios.get('/products/api/')
        .then(res => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }))
        .catch(err => console.log(err))
}

