import React, { useEffect } from "react";
import axios from "axios";

const HotelBooking = (props) => {
  const { hotelId } = props.match.params;
  alert("Got here");
  useEffect(() => {
    axios
      .get(`https://explore-it-hotel.herokuapp.com/api/v1/vendors/${hotelId}`, {
        headers: { exploreItToken: localStorage.getItem("jwtToken") },
      })
      .then(({ data }) => {
        console.log(data);
      });
  }, []);

  return <div>Hotel Booking</div>;
};

export default HotelBooking;
