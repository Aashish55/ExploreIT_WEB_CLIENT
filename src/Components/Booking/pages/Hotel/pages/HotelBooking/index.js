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
          Room{data.vendor[0].rooms.length>1?`s: ( ${data.vendor[0].rooms.length} )`:`: ( ${data.vendor[0].rooms.length} )`}
        </Subtitle>

        <RoomsContainer>
        {data.vendor[0].rooms.map(room=>(
          <BookingCard color={ room.booked ?'rgb(252, 241, 242)': 'rgb(242,252,241)'} key={room._id}>
          <Info>
            Room No: {room.roomNo}
          </Info>
          <RoomInfo>
            Adult: {room.capacity.adult}, Children: {room.capacity.child} 
          </RoomInfo>
          <PriceInfo>
            Rs.{room.prices[0].value} 
          </PriceInfo>
          <BookButton>
          {room.booked ?'Reserved': 'Book Now'}
          </BookButton>

          
        </BookingCard>
        ))}
        </RoomsContainer>
        
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
  align-items:center;
`;
const DescriptionContainer = styled.div`
  padding:0 2rem;
  display: flex;
  flex-direction: column;
  align-items:center;
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
const RoomsContainer = styled.div`
    display:flex;
    flex-wrap:wrap;
`;
const BookingCard = styled.div`
  height:28rem;
  width:22rem;
  margin:3rem;
  padding:2rem;
  background-color:${props=>props.color};
  border-radius:2rem;
  box-shadow:3px 3px 6px rgb(128, 128, 128, 0.2);
  font-family:-apple-system;
  display:flex;
  color:rgb(64,64,64);
  flex-direction:column;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition: all .2s ease-in;
  &:hover{
    background-color:#353b48;
    color:white;
    transform: scale(1.1);
  }
`;
const Info = styled.p`
    font-size:2.5rem;
    margin:1rem 0;
`;

const RoomInfo = styled.p`
    font-size:2rem;
    margin:1rem 0;
`;

const PriceInfo = styled.p`
    font-size:3rem;
    margin:1rem 0;
    color:#44bd32;
`;
const BookButton = styled.button`
  outline:none;
  border:4px solid #44bd32;
  padding:1rem;
  width:60%;
  font-size:1.6rem;
  font-weight:bold;
  border-radius:10rem;
  background-color:#44bd32;
  color:#f8f8f8;
  transition:all .2s ease-in;
  cursor:pointer;
  &:hover{
    color:#44bd32;
    background-color:#f8f8f8;
  }
`;


export default HotelBooking;
