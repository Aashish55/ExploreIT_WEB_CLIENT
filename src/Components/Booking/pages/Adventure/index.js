import React from "react";
import { Switch, Route } from "react-router-dom";
import AdventureList from "./pages/AdventureList"
import AdventureBooking from "./pages/AdventureBooking"

const Adventure = () => {
  return <Switch>
  <Route path="/booking/adventure" exact component={AdventureList} />
  <Route path="/booking/adventure/:adventureId" exact component={AdventureBooking} />
</Switch>
};

export default Adventure;
