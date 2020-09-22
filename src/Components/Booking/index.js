import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Button from "../UI/Button/Button";

import Adventure from "./pages/Adventure";
import Hotel from "./pages/Hotel";
import Travel from "./pages/Travel";

const features = [
  { name: "Hotels", link: "/booking/hotel" },
  { name: "Adventures", link: "/booking/adventure" },
  { name: "Travels", link: "/booking/travel" },
];

const Booking = (props) => {
  const logoutHandler = () => {
    localStorage.clear();
  };

  const { currentUser } = props;

  useEffect(() => {
    props.history.push("/booking/hotel");
  }, []);

  return (
    <HomepageContainer>
      <HomePageNavbar>
        <Info color="ffffff">{currentUser.name.toUpperCase()}</Info>
        <Features>
          {features.map((feature) => (
            <Feature
              key={feature.link}
              onClick={() => props.history.push(feature.link)}
              className={
                window.location.href.includes(feature.link) ? "active" : ""
              }
            >
              {feature.name}
            </Feature>
          ))}
        </Features>
        <Button logoutHandler={logoutHandler} />
      </HomePageNavbar>
      <Switch>
        <Route path="/booking/adventure" component={Adventure} />
        <Route path="/booking/hotel" component={Hotel} />
        <Route path="/booking/travel" component={Travel} />
      </Switch>
    </HomepageContainer>
  );
};

const HomepageContainer = styled.div`
  display: flex;
  background-color: #ffffff;
`;

const HomePageNavbar = styled.div`
  background: linear-gradient(134.73deg, #c54409 0%, #f6763c 98.01%);
  height: 100vh;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  width: 40rem;
  padding: 3rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
`;
const Info = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 3.5rem;
  font-weight: 300;
  color: #${(props) => props.color};
  padding-bottom: 1rem;
`;
const Features = styled.div`
  margin: 2rem 0;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Feature = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #c54409;
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 2.5rem;
  text-align: center;
  display: block;
  border-top-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    background-color: #c54409;
    color: #ffffff;
  }
  &.active {
    width: 80%;
    background-color: #c54409;
    color: #ffffff;
  }
`;
const Card = styled.div`
  height: 36rem;
  width: 25rem;
  margin: 1rem 0;
  background-color: white;
  border-radius: 3rem;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 2rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
const PlaceName = styled.div`
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  text-transform: uppercase;
  font-family: -apple-system;
  padding: 1rem 15rem;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  transform: translateY(1rem) rotate(-8deg);
  background-image: linear-gradient(to bottom right, #ffb900, #ff7730);
`;
const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-grow: 1;
  width: 100%;
  overflow: auto;
`;

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Booking);
