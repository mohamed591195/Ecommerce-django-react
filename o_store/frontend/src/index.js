import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/NavBar';
import CategoryList from './components/CategoryList';
import ProductListContainer from './components/ProductListContainer';

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

import { HashRouter } from 'react-router-dom';
import ProductList from './components/ProductList';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
    return (<Provider store={store}>
        <HashRouter>
            <NavBar />
            <CategoryList />
            <ProductListContainer />
        </HashRouter>
    </Provider>);
};

ReactDOM.render(<App />, document.querySelector('#root'));