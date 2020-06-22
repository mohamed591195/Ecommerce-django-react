import React from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import { getCategories, getAllProducts, getCategoryProducts } from '../actions/creators';
import { connect } from 'react-redux';

class CategoryList extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories, getAllProducts, getCategoryProducts } = this.props;
        return (
            <aside className="categories-aside">
                <ul>
                    <li key={0}>
                        <Link to="/" onClick={getAllProducts} >
                            <em>All</em>
                        </Link>
                    </li>

                    {categories
                        ?
                        categories.map(c =>
                            <li key={c.id}>
                                <Link
                                    to={"/" + c.slug}
                                // onClick={() => getCategoryProducts(c.slug)}
                                >
                                    {c.name} <em>{c.num_products} items</em>
                                </Link>
                            </li>
                        )
                        :
                        <span>loading ...</span>
                    }
                </ul>
            </aside>
        );
    }
}

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(
    mapStateToProps,
    {
        getCategories,
        getCategoryProducts,
        getAllProducts
    }
)(CategoryList);