import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import moment from "moment";
import styled from "styled-components";
import { connect } from "react-redux";

const SOCKET_ENDPOINT = "https://explore-it-travel.herokuapp.com";

const BookTravel = (props) => {
  const [travel, setTravel] = useState();
  const [socket, setSocket] = useState();
  const [chosenSeats, setChosenSeats] = useState([]);

  useEffect(() => {
    const { travelId } = props.match.params;
    console.log(travelId);
    let socket = socketIOClient(SOCKET_ENDPOINT, {
      query: {
        travelId: travelId,
      },
    });

    setSocket(socket);

    socket.on("travelDetails", (travel) => {
      setTravel(travel);
    });

    socket.on("confirmBooking", (travel) => {
      setChosenSeats([]);
    });

    return () => {
      socket.disconnect(true);
    };
  }, []);
  if (!travel) {
    return null;
  }

  const handleSeatClick = ({ status, seat }) => {
    if (!status) {
      setChosenSeats([...chosenSeats, seat]);
      socket.emit("seatTouch", seat);
    } else if (status === "BOOKED") {
    } else if (status === "UNAVAILABLE") {
      alert("UNAVAILABLE");
    } else if (status === "SELECTED") {
      const newChosenSeats = chosenSeats.filter((seatId) => seatId !== seat);
      setChosenSeats(newChosenSeats);
      socket.emit("seatUnTouch", seat);
    }
  };

  const {
    vehicle: { seats },
    seatStatus,
  } = travel;

  const noOfRows = seats.length / 4;

  const handleBooking = () => {
    const {
      currentUser: { _id },
    } = props;
    console.log("Emitted Booking");
    socket.emit("booking", {
      seatIds: chosenSeats,
      travel: travel._id,
      user: _id,
    });
  };

  return (
    <PageWrapper>
      <h2>
        {travel.from} - {travel.to}
      </h2>
      <h3>
        Departure{" "}
        {moment(new Date(travel.departureDate)).format("YYY/MM/DD HH:mm")}{" "}
      </h3>
      <h3>Price : {travel.price}</h3>
      <BusWrapper>
        <BusColumn>
          {new Array(noOfRows).fill(0).map((_, index) => {
            const firstSeat = seats.find(
              ({ number }) => number == index * 4 + 1
            );
            const secondSeat = seats.find(
              ({ number }) => number == index * 4 + 2
            );

            let firstSeatStatus = seatStatus.find(
              ({ seat }) => seat === firstSeat._id
            )?.status;
            let secondSeatStatus = seatStatus.find(
              ({ seat }) => seat === secondSeat._id
            )?.status;

            if (chosenSeats.includes(firstSeat._id)) {
              firstSeatStatus = "SELECTED";
            }

            if (chosenSeats.includes(secondSeat._id)) {
              secondSeatStatus = "SELECTED";
            }

            return (
              <React.Fragment key={index + "left"}>
                <Seat
                  status={firstSeatStatus}
                  onClick={() =>
                    handleSeatClick({
                      status: firstSeatStatus,
                      seat: firstSeat._id,
                    })
                  }
                >
                  {firstSeat.name}
                </Seat>
                <Seat
                  status={secondSeatStatus}
                  onClick={() =>
                    handleSeatClick({
                      status: secondSeatStatus,
                      seat: secondSeat._id,
                    })
                  }
                >
                  {secondSeat.name}
                </Seat>
              </React.Fragment>
            );
          })}
        </BusColumn>
        <BusColumn>
          {new Array(noOfRows).fill(0).map((_, index) => {
            const firstSeat = seats.find(
              ({ number }) => number == index * 4 + 3
            );
            const secondSeat = seats.find(
              ({ number }) => number == index * 4 + 4
            );

            let firstSeatStatus = seatStatus.find(
              ({ seat }) => seat === firstSeat._id
            )?.status;

            let secondSeatStatus = seatStatus.find(
              ({ seat }) => seat === secondSeat._id
            )?.status;

            if (chosenSeats.includes(firstSeat._id)) {
              firstSeatStatus = "SELECTED";
            }

            if (chosenSeats.includes(secondSeat._id)) {
              secondSeatStatus = "SELECTED";
            }

            return (
              <React.Fragment key={index + "right"}>
                <Seat
                  status={firstSeatStatus}
                  onClick={() =>
                    handleSeatClick({
                      status: firstSeatStatus,
                      seat: firstSeat._id,
                    })
                  }
                >
                  {firstSeat.name}
                </Seat>
                <Seat
                  status={secondSeatStatus}
                  onClick={() =>
                    handleSeatClick({
                      status: secondSeatStatus,
                      seat: secondSeat._id,
                    })
                  }
                >
                  {secondSeat.name}
                </Seat>
              </React.Fragment>
            );
          })}
        </BusColumn>
      </BusWrapper>
      <Button onClick={handleBooking}>Book Now !</Button>
    </PageWrapper>
  );
};

const BusWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
  padding: 20px;
  background-color: #f0f0f0;
  margin: 20px 0;
`;

const BusColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Seat = styled.div`
  font-size: 15px;
  background-color: ${({ status }) =>
    status === "BOOKED"
      ? "red"
      : status === "UNAVAILABLE"
      ? "black"
      : status === "SELECTED"
      ? "yellow"
      : "#39f"};
  color: white;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const Button = styled.button`
  color: #ffffff;
  background-color: #c54409;
  font-size: 2.2rem;
  padding: 1rem;
  width: 60%;
  outline: none;
  border: none;
  border-radius: 1rem;

  cursor: pointer;
`;

const PageWrapper = styled.div`
  margin: 30px auto;
`;

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(BookTravel);
