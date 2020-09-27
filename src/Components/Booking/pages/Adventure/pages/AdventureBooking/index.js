import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Spinner from "../../../../../Spinner/Spinner";
import './style.css'

const AdventureBooking = (props) => {
  const { adventureId } = props.match.params;
  const [data, setData] = useState({ adventureVendor: [] });
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://explore-it-adventure.herokuapp.com/api/v1/adventures/${adventureId}/service`,
        {
          headers: { exploreItToken: localStorage.getItem("jwtToken") },
        }
      )
      .then(({ data }) => {
        setLoading(false);
        setData((previousData) => ({
          adventureVendor: previousData.adventureVendor.concat(data),
        }));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  console.log(data);

  return (
    <BookingInformation>
      {loading ? (
        <Spinner />
      ) : data.adventureVendor.length === 0 ? null : (
        <React.Fragment>
          <DetailImage
            img={"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            }
          />
          <Container>
          {data.adventureVendor.map(adventureVendor=>(
            <BookButton key={adventureVendor._id} className={window.location.href.includes(`/booking/adventure/${adventureVendor._id}`) ? "active" : ""}>{adventureVendor.vendor.name}</BookButton>
          ))}
          </Container>
          <DescriptionContainer>
            
          </DescriptionContainer>
        </React.Fragment>
      )}
    </BookingInformation>
  );
};

// <Title>{data.vendor[0].name}</Title>

//             <Subtitle color={"gray"}>{data.vendor[0].description}</Subtitle>

//             <Subtitle color={"black"}>
//               Room
//               {data.vendor[0].rooms.length > 1
//                 ? `s: ( ${data.vendor[0].rooms.length} )`
//                 : `: ( ${data.vendor[0].rooms.length} )`}
//             </Subtitle>

//             <RoomsContainer>
//               {data.vendor[0].rooms.map((room) => (
//                 <BookingCard
//                   color={
//                     room.booked ? "rgb(252, 241, 242)" : "rgb(242,252,241)"
//                   }
//                   key={room._id}
//                 >
//                   <Info>Room No: {room.roomNo}</Info>
//                   <RoomInfo>
//                     Adult: {room.capacity.adult}, Children:{" "}
//                     {room.capacity.child}
//                   </RoomInfo>
//                   <PriceInfo>
//                     Rs.
//                     {room.prices.map((price) =>
//                       price.isCurrent ? price.value : null
//                     )}
//                   </PriceInfo>
//                   <BookButton
//                     onClick={() => {
//                       showModal(true);
//                       const roomPrice = room.prices.map((price) =>
//                         price.isCurrent ? price.value : null
//                       );
//                       const priceID = room.prices.map((price) =>
//                         price.isCurrent ? price._id : null
//                       );
//                       setName(data.vendor[0].name);
//                       setRoom(room.roomNo);
//                       setRoomID(room._id);
//                       setPrice(roomPrice);
//                       setPriceID(priceID);
//                     }}
//                   >
//                     {room.booked ? "Reserved" : "Book Now"}
//                   </BookButton>
//                 </BookingCard>
//               ))}
//             </RoomsContainer>

const BookingInformation = styled.div`
  height: 100vh;
  width: 100%;
  margin-left: 40rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  width:100%;
  padding:1rem 2rem;
  margin:1rem 2rem;
`;
const DescriptionContainer = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailImage = styled.div`
  height: 40rem;
  width: 100%;
  background-color: orange;
  background-image: linear-gradient(
      to bottom,
      transparent,
      rgb(255, 255, 255, 0.5)
    ),
    url(${(props) => props.img});
  background-size: cover;
  background-position: center;
`;

const Title = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  font-size: 5rem;
  color: #c54409;
  padding-bottom: 1rem;
`;
const Subtitle = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 3rem;
  color: ${(props) => props.color};
  padding-bottom: 1rem;
`;
const RoomsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const BookingCard = styled.div`
  height: 28rem;
  width: 22rem;
  margin: 3rem;
  padding: 2rem;
  background-color: ${(props) => props.color};
  border-radius: 2rem;
  box-shadow: 3px 3px 6px rgb(128, 128, 128, 0.2);
  font-family: -apple-system;
  display: flex;
  color: rgb(64, 64, 64);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: #353b48;
    color: white;
    transform: scale(1.1);
  }
`;
const Info = styled.p`
  font-size: 2.5rem;
  margin: 1rem 0;
`;

const RoomInfo = styled.p`
  font-size: 2rem;
  margin: 1rem 0;
`;

const PriceInfo = styled.p`
  font-size: 3rem;
  margin: 1rem 0;
  color: #44bd32;
`;
const BookButton = styled.button`
  outline: none;
  border: 2px solid black;
  padding: 1rem;
  margin: 1rem 2rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  background-color: transparent;
  color: black;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    transform:rotate(-2deg) scale(1.1);
  }
  &.active {
    color: white;
    background-color: black;
  }
`;
const Backdrop = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 200;
`;

export default AdventureBooking;
