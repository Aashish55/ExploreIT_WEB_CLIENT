import React from "react";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";

const ButtonDesign = styled.button`
  background-color: #ffffff;
  color: #c54409;
  font-size: 2.2rem;
  padding: 1rem;
  width: 60%;
  outline: none;
  border: none;
  border-radius: 1rem;
`;

const Button = (props) => {
  return (
    <ButtonDesign onClick={props.logoutHandler}>
      {props.isLoading ? <BeatLoader size={10} color="#c54409" loading /> : "Logout"}
    </ButtonDesign>
  );
};

export default Button;
