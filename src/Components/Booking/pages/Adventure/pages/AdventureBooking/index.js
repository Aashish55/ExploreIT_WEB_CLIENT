import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import styled from "styled-components";
import Spinner from "../../../../../Spinner/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdventureBooking = (props) => {
  const { adventureId } = props.match.params;
  const [data, setData] = useState({ adventureVendor: [] });
  const [loading, setLoading] = useState();
  const [description, setDescription] = useState(null);
  const [date, handleDate] = useState(new Date());
  const day = date.getDay();

  const Day = (dayFromDate) => {
    if (dayFromDate === 0) {
      return "SUNDAY";
    } else if (dayFromDate === 1) {
      return "MONDAY";
    } else if (dayFromDate === 2) {
      return "TUESDAY";
    } else if (dayFromDate === 3) {
      return "WEDNESDAY";
    } else if (dayFromDate === 4) {
      return "THURSDAY";
    } else if (dayFromDate === 5) {
      return "FRIDAY";
    } else if (dayFromDate === 6) {
      return "SATURDAY";
    }
  };

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
  console.log(description);
  console.log(date);

  return (
    <BookingInformation>
      {loading ? (
        <Spinner />
      ) : data.adventureVendor.length === 0 ? null : (
        <React.Fragment>
          <DetailImage
            img={
              "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            }
          />
          <Container>
            {data.adventureVendor.map((adventureVendor) => (
              <BookButton
                key={adventureVendor._id}
                className={
                  window.location.href.includes(
                    `/booking/adventure/${adventureVendor._id}`
                  )
                    ? "active"
                    : ""
                }
                onClick={() => setDescription(adventureVendor)}
              >
                {adventureVendor.vendor.name}
              </BookButton>
            ))}
          </Container>
          <DescriptionContainer>
            {description === null ? (
              <Info>
                Please select above available vendors for this adventure.
              </Info>
            ) : (
              <React.Fragment>
                <Title>{description.vendor.name}</Title>
                <Subtitle>{description.description}</Subtitle>
                <PriceInfo>Price: Rs.{description.prices[0].value}</PriceInfo>
                <Subtitle>Check your date:</Subtitle>
                <form>
                  <DatePicker
                    onChange={(date) => handleDate(date)}
                    selected={date}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    placeholderText="Enter your arrival date"
                    className="adventureDate"
                  />
                </form>
                <RoomsContainer>
                  {description !== null &&
                    description.serviceInfo.map((service) =>
                      service.day === Day(day) ? (
                        <BookingCard
                          color={"rgb(242,252,241)"}
                          key={service._id}
                        >
                          <PriceInfo>{Day(day)}</PriceInfo>
                          <Info>From: {service.startTime.slice(11, 19)}</Info>
                          <Info>To: {service.endTime.slice(11, 19)}</Info>
                          <Info>
                            Capacity: {service.maximumClientsToServe} People
                          </Info>
                          <AdventureBookButton>Book now</AdventureBookButton>
                        </BookingCard>
                      ) : null
                    )}
                </RoomsContainer>
              </React.Fragment>
            )}
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
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  padding: 1rem 2rem;
  margin: 1rem 2rem;
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
  font-size: 2.2rem;
  margin: 1rem 0;
  text-align: center;
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
    transform: rotate(-2deg) scale(1.1);
  }
  &.active {
    color: white;
    background-color: black;
  }
`;
const AdventureBookButton = styled.div`
  outline: none;
  border: 2px solid green;
  padding: 1rem;
  margin: 1rem 2rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  color: white;
  background-color: green;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: green;
  }
`;

export default AdventureBooking;
