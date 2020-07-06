import * as types from './types';

import axios from 'axios';
import { getTotalPrice, getConfig } from './utlils';

// CATEGORIES CREATORS
export const getCategories = () => dispatch => {
    axios.get('/api/categories/')
        .then(res => dispatch({ type: types.GET_CATEGORIES, payload: res.data }))
        .catch(err => console.log(err))
}

// PRODUCTS CREATORS
export const getAllProducts = () => (dispatch, getState) => {
    let query = getState().products.query;
    axios.get(`/api/products/?query=${query || ''}`)
        .then(res => dispatch({ type: types.GET_ALL_PRODUCTS, payload: res.data }))
        .catch(err => console.log(err))
}

export const getCategoryProducts = (categorySlug) => dispatch => {
    axios.get(`/api/products/${categorySlug}/`)
        .then(res => dispatch({ type: types.GET_CATEGORY_PRODUCTS, payload: res.data }))
        .catch(err => console.log(err))
}

export const getNextProducts = (next_link) => dispatch => {
    axios.get(next_link)
        .then(res => dispatch({ type: types.GET_NEXT_PRODUCTS, payload: res.data }))
        .catch(err => console.log(err))
}

export const setSearchQuery = (query) => ({ type: types.SET_SEARCH_QUERY, payload: query })

export const getProductDetail = (slug) => dispatch => {
    axios.get(`/api/product/${slug}/`)
        .then(res => dispatch({ type: types.GET_PRODUCT_DETAIL, payload: res.data }))
        .catch(err => console.log(err))
}


// CART CREATORS
export const addProductToCart = (productId) =>
    ({ type: types.ADD_PRODUCT_TO_CART, payload: productId })

export const removeProductFromCart = productId => dispatch => {
    dispatch({ type: types.REMOVE_PRODUCT_FROM_CART, payload: productId });
    dispatch(fillCartFromDB());
}


export const fillCartFromDB = () => (dispatch, getState) => {

    const baseCart = getState().baseCart;

    const productIds = JSON.stringify(Object.keys(baseCart));

    axios.get(`/api/products_by_ids/?product_ids=${productIds}`)
        .then(res => {
            const products = res.data.map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                quantity: baseCart[`${p.id}`],
                inventory: p.inventory,
                totalPrice: p.price * baseCart[`${p.id}`],
                image: p.images[0],
            }))

            return dispatch({
                type: types.FILL_CART,
                payload: {
                    products: products,
                    totalPrice: getTotalPrice(products)
                }
            })

        })
        .catch(err => console.log(err))
}

export const updateCartProductQuantity = (productId, quantity) => dispatch => {
    dispatch({ type: types.UPDATE_CART_PRODUCT_QUANTITY, payload: [productId, quantity] });
    dispatch(fillCartFromDB());
}


// AUTH CREATORS

// this action creator will be fired every time the page is loaded
// to authenticate the user if he provided credentials 
export const loadUser = () => (dispatch, getState) => {
    // setting the user loading state
    dispatch({ type: types.USER_LOADING });

    axios.get('/api/auth/user/', getConfig(getState))
        .then(res => {
            dispatch({ type: types.USER_LOADED, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: types.AUTHENTICATION_ERROR, payload: err });
        })
}


export const login = (email, password) => (dispatch, getState) => {

    let data = { email, password }

    axios.post('/api/auth/login/', data, getConfig(getState))
        .then(res => dispatch({ type: types.LOGIN_SUCCESSFUL, payload: res.data }))
        .catch(err => {
            dispatch({ type: types.LOGIN_FAILED, payload: err });
            console.log(err)
        })
}

export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout/', null, getConfig(getState))
        .then(res => dispatch({ type: types.LOGOUT_SUCCESSFUL }))
        .catch(err => console.log(err))
}

export const register = (userData) => (dispatch, getState) => {

    axios.post('/api/auth/register/', userData, getConfig(getState))
        .then(res => dispatch({ type: types.REGISTER_SUCCESSFUL, payload: res.data }))
        .catch(err => {
            dispatch({ type: types.REGISTER_FAILED, payload: err });
            console.log(err)
        })
}