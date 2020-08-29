import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "./Appbar/Appbar";
import SearchBar from './UI/SearchBar/SearchBar';

const Homepage = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Main = styled.div`
  width: 50%;
  position: relative;
  overflow: hidden;
  display:flex;
  flex-direction:column;
  align-items:center;
`;

const Description = styled.div`
  width: 50%;
  height: 100vh;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: linear-gradient(134.73deg, #c54409 0%, #f6763c 98.01%);
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px 0px 0px 40px;
`;

class Home extends Component {
  state = {
    user: this.props.currentUser,
  };
  render() {
    return (
      <Homepage>
        <Main>
          <AppBar />
          <SearchBar />
        </Main>
        <Description />
      </Homepage>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Home);
