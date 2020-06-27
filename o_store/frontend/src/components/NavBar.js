import React from 'react';
import { connect } from 'react-redux';
import { setSearchQuery, getAllProducts } from '../actions/creators';
import { Redirect, withRouter } from 'react-router-dom';


class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            redirect: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const { setSearchQuery, getAllProducts, location, history } = this.props;

        setSearchQuery(this.state.query);
        (location.pathname !== '/') ? history.push('/') : getAllProducts()
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Electronics Store</a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <form onSubmit={this.onSubmit} className="form-inline my-2 my-lg-0">
                        <input onChange={this.onChange} value={this.state.query} name="query" className="form-control mr-sm-2" type="search" placeholder="product or category" aria-label="Search" />
                        <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link" href="#">Cart</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    setSearchQuery: query => dispatch(setSearchQuery(query)),
    getAllProducts: () => { dispatch(getAllProducts()) }
})

export default connect(null, mapDispatchToProps)(withRouter(NavBar));