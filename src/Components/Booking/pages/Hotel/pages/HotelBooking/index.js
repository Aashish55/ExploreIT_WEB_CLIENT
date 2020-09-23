import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const HotelBooking = (props) => {
  const { hotelId } = props.match.params;
  const [data, setData] = useState({ vendor: [] });
  useEffect(() => {
    axios
      .get(`https://explore-it-hotel.herokuapp.com/api/v1/vendors/${hotelId}`, {
        headers: { exploreItToken: localStorage.getItem("jwtToken") },
      })
      .then(({ data }) => {
        
        setData((previousData) => ({
          vendor: previousData.vendor.concat(data.vendor),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  console.log(data);
  return (

    <BookingInformation>
      {data.vendor.length === 0 ? null : (
        <React.Fragment>
        <DetailImage img={data.vendor[0].medias[0].heading} />
        <DescriptionContainer>
        <Title>
        {data.vendor[0].name}
        </Title>
        <Subtitle color={'gray'}>
        {data.vendor[0].description}
        </Subtitle>
        <Subtitle color={'black'}>
          Available rooms: ( {data.vendor[0].rooms.length} )
        </Subtitle>
      </DescriptionContainer>
      </React.Fragment>
      )}
    </BookingInformation>
  );
};

const BookingInformation = styled.div`
  height: 100vh;
  width: 100%;
  margin-left: 40rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
const DescriptionContainer = styled.div`
  padding:0 2rem;
`;

const DetailImage = styled.div`
  height: 40rem;
  width: 100%;
  background-color: orange;
  background-image: linear-gradient(
      to bottom,
      transparent,
      rgb(255,255,255,0.5)
    ),
    url(${(props) => props.img});
  background-size: cover;
  background-position: center;
`;

const Title = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  font-size: 5rem;
  color: #C54409;
  padding-bottom: 1rem;
`;
const Subtitle = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 3rem;
  color: ${props=>props.color};
  padding-bottom: 1rem;
`;

export default HotelBooking;
