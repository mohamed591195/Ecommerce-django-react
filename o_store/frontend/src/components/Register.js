import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../actions/creators';

export const Register = ({ isAuthenticated, register }) => {

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        if (password1 !== password2) console.log('password doesn\'t match');
        register({ email, password1, first_name: firstName, last_name: lastName })
    }

    return (
        (isAuthenticated)
            ? <Redirect to="/" />
            :
            <div className="container col-md-6 col-sm-6">
                <form onSubmit={onSubmit} >
                    <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input onChange={e => setFirstName(e.target.value)} value={firstName} type="text" className="form-control" id="first-name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input onChange={e => setLastName(e.target.value)} value={lastName} type="text" className="form-control" id="last-name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onChange={e => setEmail(e.target.value)} value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input onChange={e => setPassword1(e.target.value)} value={password1} type="password" className="form-control" id="password1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password2">Password Confirmation</label>
                        <input onChange={e => setPassword2(e.target.value)} value={password2} type="password" className="form-control" id="password2" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Register
                </button>
                </form>
            </div>
    );
}

const mapStateToProps = ({ auth }) => ({ isAuthenticated: auth.isAuthenticated })

export default connect(mapStateToProps, { register })(Register);