import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/creators';
import { Redirect } from 'react-router-dom';

export const Login = (props) => {

    const { login, isAuthenticated } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        login(email, password);
    }

    return (
        (isAuthenticated)
            ? <Redirect to="/" />
            :
            <div className="container col-md-6 col-sm-6">
                <form onSubmit={onSubmit} >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={e => setPassword(e.target.value)} value={password} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                </button>
                </form>
            </div>
    );
}

const mapStateToProps = ({ auth }) => ({ isAuthenticated: auth.isAuthenticated })

export default connect(mapStateToProps, { login })(Login);