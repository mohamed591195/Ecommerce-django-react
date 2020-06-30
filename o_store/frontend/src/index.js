import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/NavBar';
import CategoryList from './components/CategoryList';
import ProductListContainer from './components/ProductListContainer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

import { HashRouter, Route, Switch } from 'react-router-dom';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
    return (<Provider store={store}>
        <HashRouter>
            <NavBar />
            <Route exact path={['/', '/:slug']} component={CategoryList} />
            <ProductListContainer />
            <Route path='/product/:slug' component={ProductDetail} />
            <Route path='/cart/detail' component={Cart} />
        </HashRouter>
    </Provider>);
};

ReactDOM.render(<App />, document.querySelector('#root'));