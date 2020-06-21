import React from 'react';
import Product from './Product';
import { connect } from 'react-redux';
import { getAllProducts } from '../actions/creators';

class ProductList extends React.Component {

    componentDidMount() {
        this.props.getAllProducts();
    }
    render() {
        const { products } = this.props;
        return (
            <div className="products">
                {products.map(p => <Product key={p.id} {...p} />)}

            </div>
        );
    }
}

const mapStateToPros = ({ products }) => ({ products });

export default connect(mapStateToPros, { getAllProducts })(ProductList);