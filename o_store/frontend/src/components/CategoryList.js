import React from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../actions/creators';
import { connect } from 'react-redux';

const CategoryList = props => {

    const { categories, getAllProducts } = props;
    return (
        <aside className="categories-aside">
            <ul>
                <li key={0}>
                    <Link to="/" onClick={getAllProducts} >
                        All
                        </Link>
                </li>

                {categories
                    ?
                    categories.map(c =>
                        <li key={c.id}>
                            <Link to={"/" + c.slug}>
                                {c.name} ({c.num_products})
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

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps, { getAllProducts })(CategoryList);