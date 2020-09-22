import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "../../../../../UI/Button/Button";
import axios from "axios";
import Spinner from "../../../../../Spinner/Spinner";
import SearchBar from "../../../../../UI/SearchBar/SearchBar";

const Hotel = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://explore-it-hotel.herokuapp.com/api/v1/vendors/all", {
        headers: {
          exploreittoken: localStorage.getItem("jwtToken"),
        },
      })
      .then((response) => {
        setData(response.data.allVendors);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <DataSection>
      <SearchBar />
      <MainContainer>
        {loading ? (
          <Spinner />
        ) : data.length === 0 ? (
          <Info color="555555">
            Sorry, there are no data available right now.
          </Info>
        ) : (
          data.map((hotel) => (
            <Card key={hotel.name} img={hotel.medias[0].heading}>
              <PlaceName
                onClick={() =>
                  props.history.push(`/booking/hotel/${hotel._id}`)
                }
              >
                {hotel.name}
              </PlaceName>
            </Card>
          ))
        )}
      </MainContainer>
    </DataSection>
  );
};

const HomepageContainer = styled.div`
  display: flex;
  background-color: #ffffff;
`;
const DataSection = styled.div`
  height: 100vh;
  width: 100%;
  margin-left: 42rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default connect(mapStateToProps)(Hotel);