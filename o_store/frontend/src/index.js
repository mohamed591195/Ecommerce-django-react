import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/NavBar';
import CategoryList from './components/CategoryList';
import ProductDetail from './components/ProductDetail';
import CartContainer from './components/CartContainer';

import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { getCategories } from './actions/creators';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProductList from './components/ProductList';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));


const RootContainerComponent = props => {

    const { getCategories: getCat, categories } = props;

    useEffect(() => {
        getCat();
    }, [])

    return (
        !categories.length
            ? <h2>Loading...</h2>
            :
            <BrowserRouter>
                <NavBar />
                <Switch>

                    <Route exact path="/">
                        <CategoryList />
                        <ProductList />
                    </Route>

                    {categories.map(c =>
                        <Route key={c.id} exact path={"/" + c.slug}>
                            <CategoryList />
                            <ProductList />
                        </Route>
                    )}

                    <Route exact path='/product/:slug' component={ProductDetail} />
                    <Route exact path='/cart' component={CartContainer} />
                    <Route exact path="/404" render={() => <h2>Page Not Found!</h2>} />
                    <Redirect from='*' to='/404' />
                </Switch>
            </BrowserRouter>
    );
}

const mapStateToProps = ({ categories }) => ({ categories });

let RootContainer = connect(mapStateToProps, { getCategories })(RootContainerComponent);



const App = () => {

    return (
        <Provider store={store}>
            <RootContainer />
        </Provider>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));