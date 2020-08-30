import React from "react";
import styled from "styled-components";
import photo from "../../../images/adventure.jpg";

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
  background-image: url(${photo});
  background-size: cover;
  background-position: center;
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

const DestinationCards = () => {
  return (
    <React.Fragment>
      <Card>
        <PlaceName>Dhulikhel</PlaceName>
      </Card>
      <Card>
        <PlaceName>Kathmandu</PlaceName>
      </Card>
      <Card>
        <PlaceName>Panauti</PlaceName>
      </Card>
      <Card>
        <PlaceName>Banepa</PlaceName>
      </Card>
      <Card>
        <PlaceName>Dolalghat</PlaceName>
      </Card>
      <Card>
        <PlaceName>Ramechhap</PlaceName>
      </Card>
      <Card>
        <PlaceName>Dhulikhel</PlaceName>
      </Card>
      <Card>
        <PlaceName>Kathmandu</PlaceName>
      </Card>
      <Card>
        <PlaceName>Panauti</PlaceName>
      </Card>
      <Card>
        <PlaceName>Banepa</PlaceName>
      </Card>
      <Card>
        <PlaceName>Dolalghat</PlaceName>
      </Card>
      <Card>
        <PlaceName>Ramechhap</PlaceName>
      </Card>
    </React.Fragment>
  );
};

export default DestinationCards;
