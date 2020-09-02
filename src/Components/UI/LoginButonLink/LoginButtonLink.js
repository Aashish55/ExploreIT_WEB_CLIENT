import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Button = styled.button`
    color:rgb(197, 68, 9);
    padding : 1rem 2.5rem;
    background-color:white;
    border-radius:1rem;
    border:none;
    outline:none;
    font-size:2.5rem;
    margin:3rem;
    width:30rem;
`;

const LoginButtonLink = () => {
    return (
        <Button>
        <Link to="/login" style={{textDecoration:"none"}}>Start Booking</Link>
        </Button>
    );
}
 
export default LoginButtonLink;