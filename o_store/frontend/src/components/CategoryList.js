import React from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import { getCategories, getAllProducts } from '../actions/creators';
import { connect } from 'react-redux';

class CategoryList extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories, getAllProducts } = this.props;
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
}

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(
    mapStateToProps,
    {
        getCategories,
        getAllProducts
    }
)(CategoryList);