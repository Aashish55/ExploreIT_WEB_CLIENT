import React, { Component } from 'react';
import './style.css';
// import LoginImage from './../../images/adventure.jpg'

class Login extends Component {
    state = {}
    render() {
        return (
            <div className='section'>
                <div className='leftPart'>
                    <h1>ExploreIT</h1>
                    <p className='secondary_text'>Some Text Here...</p>
                    <h2 className='arrowRight'>&rsaquo;</h2>
                </div>
                <div className='form'>
                    <h3>Login</h3>
                    <h4>Email</h4>
                    <input className='input' />

                    <h4>Password</h4>
                    <input className='input' />

                    <button className='submit'>Login</button>

                    <p className='switch_text'>Don't have an Account ? <a href='/registration'>Register Here.</a> </p>
                </div>
            </div>
        );
    }
}

export default Login;