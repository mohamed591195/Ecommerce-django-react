import React from 'react';
import PropTypes from 'proptypes';
import { Link } from 'react-router-dom';
import { getCategories } from '../actions/creators';
import { connect } from 'react-redux';

class CategoryList extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        const { categories } = this.props;
        return (
            <aside className="categories-aside">

                {categories
                    ?
                    <ul>
                        {categories.map(c =>
                            <li key={c.id}>
                                <Link to={c.slug + '/'}>{c.name} <em>{c.num_products} items</em></Link>
                            </li>
                        )}
                    </ul>
                    :
                    <span>loading ...</span>
                }
            </aside>
        );
    }
}

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps, { getCategories })(CategoryList);