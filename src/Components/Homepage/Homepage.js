import React, { Component } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import Button from '../UI/Button/Button'

// const HomepageContainer = styled.div`
//     display:flex;
//     background-color:#ffffff;
// `;
const HomePageNavbar = styled.div`
    background: linear-gradient(134.73deg, #C54409 0%, #F6763C 98.01%);
    height:100vh;
    border-top-right-radius:1rem;
    border-bottom-right-radius:1rem;
    width:40rem;
    padding:3rem;
    margin-right:2rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
`;
const Info = styled.h3`
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    font-size: 3.5rem;
    font-weight:300;
    color: white;
    padding-bottom: 1rem;
`;

class Homepage extends Component {
    state = {
        user: this.props.currentUser,
    }
    render() { 
        const {user} = this.state;
        return (  
            <HomePageNavbar>
                <Info>{user.name.toUpperCase()}</Info>
                <Button />
            </HomePageNavbar>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
  });
  
  export default connect(mapStateToProps)(Homepage);