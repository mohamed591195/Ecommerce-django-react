import React from 'react';
import { connect } from 'react-redux';
import { setSearchQuery, getAllProducts, logout } from '../actions/creators';
import { Link, withRouter } from 'react-router-dom';


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

        // if this the home page then calling get all products will load product 
        // according to the query in the state
        // else redirection to the home will make the same effect

        (location.pathname !== '/') ? history.push('/') : getAllProducts()
    }

    render() {
        const { cart, isAuthenticated, logout } = this.props;
        const cartLength = Object.keys(cart).length

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
                    {(!isAuthenticated)
                        ?
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </>
                        :
                        <li className="nav-item">
                            <button onClick={logout} className="nav-link">
                                Logout
                            </button>
                        </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                            <span style={{ color: 'black' }}>Your Cart:</span> {cartLength || 'NO'} item{cartLength === 1 ? '' : 's'}
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

const mapStateToProps = ({ baseCart, auth }) =>
    ({ cart: baseCart, isAuthenticated: auth.isAuthenticated });

const mapDispatchToProps = (dispatch) => ({
    setSearchQuery: query => dispatch(setSearchQuery(query)),
    getAllProducts: () => dispatch(getAllProducts()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));