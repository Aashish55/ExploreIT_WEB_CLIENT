import React, { Component } from 'react';
import './style.css';
import LoginImage from './../../images/adventure.jpg'

class Login extends Component {
    state = {  }
    render() { 
        return (  
            <div className='Login__Section'>
            <div className='Login__Container'>
                <div className='imageSection'>
                    <img className='loginImage' src={LoginImage} alt='LoginImage'/>
                </div>
                <div className="Login__Form">
                    <input />
                    <input />
                </div>
            </div>

            </div>
        );
    }
}
 
export default Login;