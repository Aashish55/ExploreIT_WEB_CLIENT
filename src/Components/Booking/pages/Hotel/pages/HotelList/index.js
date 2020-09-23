import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
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
        console.log(error);
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
            <Card
              key={hotel.name}
              img={hotel.medias[0].heading}
              onClick={() => props.history.push(`/booking/hotel/${hotel._id}`)}
            >
              <PlaceName>{hotel.name}</PlaceName>
            </Card>
          ))
        )}
      </MainContainer>
    </DataSection>
  );
};

const DataSection = styled.div`
  height: 100vh;
  width: 100%;
  margin-left: 42rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Info = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 3.5rem;
  font-weight: 300;
  color: #${(props) => props.color};
  padding-bottom: 1rem;
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
  cursor:pointer;
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
