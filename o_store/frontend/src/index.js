import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/NavBar';
import Categories from './components/Product';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => (
    <Provider store={store}>
        <NavBar />
        <Categories />
    </Provider>
);

ReactDOM.render(<App />, document.querySelector('#root'));