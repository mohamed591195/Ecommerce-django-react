import {
    GET_CATEGORIES,
    GET_ALL_PRODUCTS,
    GET_NEXT_PRODUCTS,
    GET_CATEGORY_PRODUCTS,
    SET_SEARCH_QUERY,
    GET_PRODUCT_DETAIL
} from './types';

import axios from 'axios';


export const getCategories = () => dispatch => {
    axios.get('/api/categories/')
        .then(res => dispatch({ type: GET_CATEGORIES, payload: res.data }))
        .catch(err => console.log(err))
}

export const getAllProducts = () => (dispatch, getState) => {
    let query = getState().products.query;
    axios.get(`/api/products/?query=${query || ''}`)
        .then(res => dispatch({ type: GET_ALL_PRODUCTS, payload: res.data }))
        .catch(err => console.log(err))
}

export const getCategoryProducts = (categorySlug) => dispatch => {
    axios.get(`/api/products/${categorySlug}`)
        .then(res => dispatch({ type: GET_CATEGORY_PRODUCTS, payload: res.data }))
        .catch(err => console.log(err))
}

export const getNextProducts = (next_link) => dispatch => {
    axios.get(next_link)
        .then(res => dispatch({ type: GET_NEXT_PRODUCTS, payload: res.data }))
        .catch(err => console.log(err))
}

export const setSearchQuery = (query) => {
    // axios.get(`api/products/?query=${query}`)
    //     .then(res => dispatch({ type: GET_SEARCH_RESULT, payload: res.data }))
    //     .catch(err => console.log(err))
    return { type: SET_SEARCH_QUERY, payload: query }
}

export const getProductDetail = (slug) => dispatch => {
    axios.get(`api/product/${slug}`)
        .then(res => dispatch({ type: GET_PRODUCT_DETAIL, payload: res.data }))
        .catch(err => console.log(err))
}