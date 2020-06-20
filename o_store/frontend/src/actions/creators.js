import { GET_CATEGORIES } from './types';
import axios from 'axios';


const getCategories = () => dispatch => {
    axios.get('/products/api/categories/')
        .then(res => dispatch({ type: GET_CATEGORIES, payload: res.data }))
        .catch(err => console.log(err))
}

