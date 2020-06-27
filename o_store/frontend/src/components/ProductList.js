import React from 'react';
import Product from './Product';
import { connect } from 'react-redux';
import { getAllProducts, getNextProducts, getCategoryProducts, getCategories } from '../actions/creators';
import InfiniteScroll from 'react-infinite-scroll-component';


class ProductList extends React.Component {

    componentDidMount() {
        const { location, getAllProducts, getCategoryProducts } = this.props;

        (location.pathname !== '/') ? getCategoryProducts(location.pathname.slice(1)) : getAllProducts()
    }

    render() {
        const { products, next, getNextProducts } = this.props;
        return (

            <InfiniteScroll
                dataLength={products.length}
                next={() => getNextProducts(next)}
                hasMore={(next) ? true : false}
                loader={<h4>is loading...</h4>}
            >
                <div className="row">
                    {products.map(p => <Product key={p.id} {...p} />)}
                </div>
            </InfiniteScroll >

        );
    }
}

const mapStateToPros = ({ products }) => ({
    products: products.results,
    next: products.next,
});

export default connect(
    mapStateToPros,
    {
        getAllProducts,
        getNextProducts,
        getCategoryProducts
    }
)(ProductList);