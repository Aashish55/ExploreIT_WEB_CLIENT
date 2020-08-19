import React, { Component } from 'react';
import './style.css'

class Registration extends Component {
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
                    <h3>Registration</h3>

                    <h4>Full Name</h4>
                    <input className='input' />

                    <h4>Username</h4>
                    <input className='input' />

                    <h4>Gender</h4>
                    <div className='gender'>
                    <label className='genderLabel'>
                        <input type="radio" value="Male" name='gender' className='radio' />
                        Male
                    </label>
                    <label className='genderLabel'>
                        <input type="radio" value="Female" name='gender' className='radio'/>
                        Female
                    </label>
                    </div>

                    <h4>Date of Birth</h4>
                    <input className='input' disabled={true} value={Date.now().toString()} />

                    <h4>Email</h4>
                    <input className='input' />

                    <h4>Phone Number</h4>
                    <input className='input' type='number' />

                    <h4>Country Code</h4>
                    <input className='input' value='+977' />

                    <h4>Password</h4>
                    <input className='input' type='password' />

                    <h4>Confirm Password</h4>
                    <input className='input' type='password' />


                    <button className='submit'>Sign Up</button>

                    <p className='switch_text'>Already have an Account ? <a href='/login'>Login Here.</a> </p>
                </div>
            </div>
        );
    }
}
export default Registration;