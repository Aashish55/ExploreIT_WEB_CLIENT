import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AppBar from "./Appbar/Appbar";
import SearchBar from "./UI/SearchBar/SearchBar";
import DestinationCards from './UI/DestinationCards/DestinationCards'

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
const RecomendationText = styled.h4`
  text-align: left;
  margin: 0 3rem;
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Destinations = styled.div`
  display: flex;
  margin: 2rem 3rem;
  color: brown;
  height: 100%;
  width: 100%;
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
          <Center>
            <SearchBar />
          </Center>
          <RecomendationText>Our Recommendation</RecomendationText>
          <Destinations>
            <DestinationCards />
          </Destinations>
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
