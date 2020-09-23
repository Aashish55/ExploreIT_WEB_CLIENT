import React from "react";
import { Switch, Route } from "react-router-dom";
import HotelBooking from "./pages/HotelBooking";
import HotelList from "./pages/HotelList";

const Hotel = (props) => {
  return (
    <Switch>
      <Route path="/booking/hotel" exact component={HotelList} />
      <Route path="/booking/hotel/:hotelId" exact component={HotelBooking} />
    </Switch>
  );
};

export default Hotel;
