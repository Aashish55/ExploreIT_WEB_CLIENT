import React, { useState } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";

import SearchTravel from "./pages/SearchTravel";
import BookTravel from "./pages/BookTravel";

const Travel = () => {
  return (
    <TravelContainer>
      <Route path="/booking/travel" exact component={SearchTravel} />
      <Route path="/booking/travel/:travelId" exact component={BookTravel} />
    </TravelContainer>
  );
};

const TravelContainer = styled.div`
  margin-left: 42rem;
`;

export default Travel;
