import {
    GET_CATEGORIES,
    GET_ALL_PRODUCTS,
    GET_NEXT_PRODUCTS,
    GET_CATEGORY_PRODUCTS,
    SET_SEARCH_QUERY,
    GET_PRODUCT_DETAIL,
    ADD_PRODUCT_TO_CART,
    REMOVE_PRODUCT_FROM_CART,
    FILL_CART,
    UPDATE_CART_PRODUCT_QUANTITY
} from './types';

import axios from 'axios';
import products from '../reducers/products';
import baseCart from '../reducers/baseCart';
import { getTotalPrice } from './utlils';

// CATEGORIES CREATORS
export const getCategories = () => dispatch => {
    axios.get('/api/categories/')
        .then(res => dispatch({ type: GET_CATEGORIES, payload: res.data }))
        .catch(err => console.log(err))
}

// PRODUCTS CREATORS
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

export const setSearchQuery = (query) => ({ type: SET_SEARCH_QUERY, payload: query })

export const getProductDetail = (slug) => dispatch => {
    axios.get(`api/product/${slug}`)
        .then(res => dispatch({ type: GET_PRODUCT_DETAIL, payload: res.data }))
        .catch(err => console.log(err))
}


// CART CREATORS
export const addProductToCart = (productId) =>
    ({ type: ADD_PRODUCT_TO_CART, payload: productId })

export const removeProductFromCart = productId => dispatch => {
    dispatch({ type: REMOVE_PRODUCT_FROM_CART, payload: productId });
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
                type: FILL_CART,
                payload: {
                    products: products,
                    totalPrice: getTotalPrice(products)
                }
            })

        })
        .catch(err => console.log(err))
}

export const updateCartProductQuantity = (productId, quantity) => dispatch => {
    dispatch({ type: UPDATE_CART_PRODUCT_QUANTITY, payload: [productId, quantity] });
    dispatch(fillCartFromDB());
}
