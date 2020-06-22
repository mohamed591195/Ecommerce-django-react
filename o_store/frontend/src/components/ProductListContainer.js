import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import ProductList from './ProductList';


const ProductListContainer = ({ categories }) =>
    (
        <>
            <Route key={0} exact path="/" component={ProductList} />
            {categories.map(c =>
                <Route key={c.id} exact path={"/" + c.slug} component={ProductList} />
            )}
        </>
    );



const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(ProductListContainer);