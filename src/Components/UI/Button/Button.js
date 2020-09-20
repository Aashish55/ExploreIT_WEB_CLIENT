import React from 'react';
import styled from 'styled-components';

const ButtonDesign = styled.button`
    background-color:#ffffff;
    color:#C54409;
    font-size:2.2rem;
    padding:1rem;
    width:60%;
    outline:none;
    border:none;
    border-radius:1rem;
`;

const Button = (props) => {
    return (
        <ButtonDesign>Logout</ButtonDesign>
    );
}
 
export default Button;