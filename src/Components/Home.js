import React, { Component } from "react";
import styled from "styled-components";
import AppBar from "./Appbar/Appbar";
import SearchBar from "./UI/SearchBar/SearchBar";
import LoginButtonLink from "./UI/LoginButonLink/LoginButtonLink";
import data from "../Data/staticData.json";

import panauti from "../images/panauti.jpg";
import adventure from "../images/adventure.jpg";
import bethanchowk from "../images/bethanchowk.jpg";
import bhotekoshi from "../images/bhotekoshi.jpg";
import dhulikhel from "../images/dhulikhel.jpg";
import gokyo from "../images/gokyo.jpg";
import kalinchowk from "../images/kalinchowk.jpg";
import mardi from "../images/mardi.jpg";
import muktinath from "../images/muktinath.jpg";
import muldaikhopra from "../images/muldaikhopra.jpg";
import mustang from "../images/mustang.jpg";
import pokhara from "../images/pokhara.jpg";
import sworgadwari from "../images/sworgadwari.jpg";

const Homepage = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 550px) {
    flex-direction:column;
  }
`;
const Main = styled.div`
  width: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 550px) {
    width:100%;
  }
`;
const Description = styled.div`
  width: 50%;
  height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background: #c54409;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px 0px 0px 40px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 550px) {
    width:100%;
    border-radius: 40px 40px 0px 0px;
  }
`;
const RecomendationText = styled.h4`
  text-align: left;
  margin: 0 3rem;
`;
const CenterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Destinations = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  flex-grow:1;
  width: 100%;
  overflow: auto;
`;
const Card = styled.div`
  height: 30rem;
  width: 22rem;
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
const DetailImage = styled.div`
  height: 45rem;
  width: 100%;

  background-color: orange;
  background-image: linear-gradient(
      to bottom,
      transparent,
      rgb(197, 68, 9, 0.25)
    ),
    url(${(props) => props.img});
  background-size: cover;
  background-position: center;
`;
const TransparentText = styled.div`
  background-color: transparent;
  height: 45rem;
  color: transparent;
  width: 100%;
`;
const TextContainer = styled.div`
  padding: 0 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: start;
`;
const Title = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 5rem;
  color: white;
  padding-bottom: 1rem;
`;
const Subtitle = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 4rem;
  color: white;
  padding-bottom: 1rem;
`;
const PlaceDescription = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 300;
  font-size: 2rem;
  text-align: justify;
  padding-bottom: 1rem;
  color: white;
`;


class Home extends Component {
  state = {
    places: data,
    placeDetails: null,
    cardKey: null,
    searchTerm: "",
    searchResults: [],
  };

  cardClickHandler = (place) => {
    this.setState({ cardClicked: true, placeDetails: place });
  };

  sendImage = (name) => {
    if (name === "Panauti") {
      return panauti;
    } else if (name === "Bhotekoshi") {
      return bhotekoshi;
    } else if (name === "Pokhara") {
      return pokhara;
    } else if (name === "Dhulikhel") {
      return dhulikhel;
    } else if (name === "Dhungkharka") {
      return bethanchowk;
    } else if (name === "Muktinath") {
      return muktinath;
    } else if (name === "Sworgadwari") {
      return sworgadwari;
    } else if (name === "Kalinchowk") {
      return kalinchowk;
    } else if (name === "Mardi") {
      return mardi;
    } else if (name === "Mustang") {
      return mustang;
    } else if (name === "Muldai Khopra") {
      return muldaikhopra;
    } else if (name === "Gokyo Lake") {
      return gokyo;
    } else {
      return adventure;
    }
  };

  handleSearchChange = (event) => {
    this.setState(
      {
        searchTerm: event.target.value,
      },
      () => this.handleSearchPlaces()
    );
  };

  handleSearchPlaces = () => {
    const places = [...this.state.places];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = places.reduce((acc, place) => {
      if (place.name && place.name.match(regex)) {
        acc.push(place);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    // setTimeout(() => this.setState({ searchLoading: false }), 1000)
  };

  render() {
    const { places, placeDetails, searchResults } = this.state;

    return (
      <Homepage>
        <Main>
          <AppBar />
          <CenterRow>
            <SearchBar handleSearchChange={this.handleSearchChange} />
          </CenterRow>
          {places.length > 0 ? (
            <RecomendationText> Our Recomendation </RecomendationText>
          ) : (
            <Center>
              <RecomendationText>
                Sorry, there are currently no data found.
              </RecomendationText>
            </Center>
          )}
          <Destinations>
            {searchResults.length > 0
              ? searchResults.map((place, i) => (
                  <Card
                    key={place.name}
                    img={this.sendImage(place.name)}
                    onClick={() => this.cardClickHandler(place)}
                  >
                    <PlaceName>{place.name}</PlaceName>
                  </Card>
                ))
              : places.length > 0
              ? places.map((place, i) => (
                  <Card
                    key={place.name}
                    img={this.sendImage(place.name)}
                    onClick={() => this.cardClickHandler(place)}
                  >
                    <PlaceName>{place.name}</PlaceName>
                  </Card>
                ))
              : null}
          </Destinations>
        </Main>

        <Description>
          {placeDetails ? (
            <React.Fragment>
              <DetailImage img={this.sendImage(placeDetails.name)}>
                <TransparentText>ExploreIT</TransparentText>
              </DetailImage>
              <TextContainer>
                <Title>{placeDetails.name}</Title>
                <PlaceDescription>{placeDetails.description}</PlaceDescription>

                {placeDetails.hotels && placeDetails.hotels.length > 0
                  ? placeDetails.hotels.map((hotel, i) => (
                      <React.Fragment key={i}>
                        <Subtitle> {hotel.name} </Subtitle>
                        <PlaceDescription>
                          {hotel.hotelDetails}
                        </PlaceDescription>
                      </React.Fragment>
                    ))
                  : null}
                {placeDetails.adventures && placeDetails.adventures.length > 0
                  ? placeDetails.adventures.map((adventure, i) => (
                      <React.Fragment key={i}>
                        <Subtitle> {adventure.name} </Subtitle>
                        <PlaceDescription>
                          {adventure.adventureDetails}
                        </PlaceDescription>
                      </React.Fragment>
                    ))
                  : null}
                {placeDetails.tours && placeDetails.tours.length > 0
                  ? placeDetails.tours.map((tour, i) => (
                      <React.Fragment key={i}>
                        <Subtitle> {tour.name} </Subtitle>
                        <PlaceDescription>{tour.tourDetails}</PlaceDescription>
                      </React.Fragment>
                    ))
                  : null}
              </TextContainer>
              <CenterRow>
                <LoginButtonLink />
              </CenterRow>
            </React.Fragment>
          ) : (
            <Center>
              <h1 className="title">ExploreIT</h1>
              <LoginButtonLink />
            </Center>
          )}
        </Description>
      </Homepage>
    );
  }
}

export default Home;
