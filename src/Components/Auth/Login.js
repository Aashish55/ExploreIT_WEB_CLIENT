import React, { Component } from 'react';
import './style.css';
import { Link } from "react-router-dom";
import axios from 'axios';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: []
    }

    loginHandler = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            console.log('ready to login');
            this.setState({ errors: [] });

            const loginData = {
                "loginInfo":this.state.email,
                "password":this.state.password
            }
            axios.post('http://localhost:5000/api/v1/users/login',loginData)
                .then(response=>{
                    console.log(response)
                })
                .catch(error=>{
                    console.log(error)
                })
            
        }
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: "Fill in all fields" };
            this.setState({ errors: errors.concat(error) });
            return false;
        } else {
            return true;
        }
    };

    isFormEmpty = ({ email, password }) => {
        return (
            !email.length ||
            !password.length
        );
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    displayErrors = errors => errors.map((error, i) => <p key={i} className='errorMessage'>{error.message}</p>);

    render() {
        const { email, password, errors } = this.state

        return (
            <div className='section'>
                <div className='leftPart'>
                    <h1>ExploreIT</h1>
                    <p className='secondary_text'>Some Text Here...</p>
                    <h2 className='arrowRight'>&rsaquo;</h2>
                </div>
                <form className='form' onSubmit={this.loginHandler} >
                    <h3>Login</h3>

                    <h4>Email</h4>
                    <input
                        name='email'
                        onChange={this.handleChange}
                        value={email}
                        type='email'
                    />

                    <h4>Password</h4>
                    <input
                        type='password'
                        name='password'
                        onChange={this.handleChange}
                        value={password}
                    />

                    {errors.length > 0 && (
                        <div className='errorSection'>Error:
                            {this.displayErrors(errors)}
                        </div>)
                    }

                    <button className='submit' onClick={this.loginHandler}>Login</button>

                    <p className='switch_text'>Don't have an Account ?  <Link to="/registration">Register Here.</Link> </p>
                </form>
            </div>
        );
    }
}

export default Login;