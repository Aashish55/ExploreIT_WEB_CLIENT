import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    font-weight:500;
    color:black;
    font-size:1.8rem;
    position: relative;
    z-index: 500;
    background-color:#E1EFF6;
    width: 70%;
    height:20rem;
    border-radius:1rem;
    padding: 16px;
    left: 15%;
    top: 30%;
    box-sizing: border-box;
    transition: all 0.3s ease-out;
    transform: ${props=> props.show?'translateY(0)' : 'translateY(-100vh)' };
    opacity:${props=> props.show ? '1' : '0' };

    display:flex;
    flex-direction:column;
    align-items:center;
`;

const BookFormModal = (props) => {
    return (
        <Container show={props.modalStatus}>
        {props.name}
        {props.room}
        {props.price}
        </Container>
    );
}
 
export default BookFormModal;