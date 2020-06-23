import React from 'react';
import { connect } from 'react-redux';
import { getSearchResult } from '../actions/creators';

class NavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
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
        this.props.getSearchResult(this.state.query)
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

export default connect(null, { getSearchResult })(NavBar);