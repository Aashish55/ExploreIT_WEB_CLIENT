import React, { Component } from "react";
import styled from 'styled-components';
import panauti from "../../../images/panauti.jpg";
import adventure from '../../../images/adventure.jpg';

const DetailImage = styled.div`
  height: 35rem;
  width: 100%;
  background-color: orange;
  background-image: linear-gradient(to bottom, transparent,#c54409 ), url(${(props) => props.img});
  background-size: cover;
  background-position: center;
`;
const TextContainer = styled.div`
    padding:0 3rem;
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content: start;
`;

const Title = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 5rem;
    color: white;
    padding-bottom: 1rem;
`;
const Description = styled.div`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    text-align:justify;
    padding-bottom: 1rem;
    color: white;
`;

class PlaceDescription extends Component {
  state = {
    placeDetails: this.props.details,
  };
  
  sendImage = (name) => {
    if (name === "Panauti") {
      return panauti;
    } else {
      return adventure;
    }
  };

  render() {
    const {placeDetails} = this.state;

    return (
        <React.Fragment>
        <DetailImage img={this.sendImage(placeDetails[0].name)}></DetailImage>;
        <TextContainer>
        <Title>{placeDetails[0].name}</Title>
        <Description>{placeDetails[0].description}</Description>
        </TextContainer>
        
        </React.Fragment>
    ); 
    
   
  }
}

export default PlaceDescription;
