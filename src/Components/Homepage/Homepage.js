import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Button from "../UI/Button/Button";

// const HomepageContainer = styled.div`
//     display:flex;
//     background-color:#ffffff;
// `;
const HomePageNavbar = styled.div`
  background: linear-gradient(134.73deg, #c54409 0%, #f6763c 98.01%);
  height: 100vh;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  width: 40rem;
  padding: 3rem;
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.h3`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 3.5rem;
  font-weight: 300;
  color: white;
  padding-bottom: 1rem;
`;
const Features = styled.div`
  margin:2rem 0;
  width:90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Feature = styled.div`
  width:100%;
  background-color:#ffffff;
  color:#c54409;
  margin:1rem 0;
  padding:.5rem;
  font-size: 2.5rem;
  text-align:center;
  display:block;
  border-top-right-radius:1rem;
  border-bottom-left-radius:1rem;
  cursor:pointer;
  transition:all .2s linear;
  &:hover{
    background-color:#c54409;
    color:#ffffff;
  }
  &:active{
    width:80%;
  }
`;

class Homepage extends Component {
  state = {
    user: this.props.currentUser,
    isLoading: false,
    features:['Hotels','Adventures','Travels'],
    hotelActiveState:true,
    adventureActiveState:false,
    travelActiveState:false,
  };

  logoutHandler = () => {
    this.setState({ isLoading: true });
    setTimeout(()=>{
        localStorage.clear();
        this.setState({ isLoading: false });
        window.location.reload();
    }, 1500);
   
  };

  featureClickHandler = feature => {
    if(feature==='Travels'){
      this.setState({hotelActiveState:false,adventureActiveState:false, travelActiveState:true});
    }else if(feature==='Adventures'){
      this.setState({hotelActiveState:false,adventureActiveState:true, travelActiveState:false});
    }else{
      this.setState({hotelActiveState:true,adventureActiveState:false, travelActiveState:false});
    }
  }

  render() {
    const { user, isLoading, features } = this.state;
    return (
      <HomePageNavbar>
        <Info>{user.name.toUpperCase()}</Info>
        <Features>
          {features.map(feature=>(
            <Feature key={feature} onClick={(feature)=>this.featureClickHandler} >{feature}</Feature>
          ))}
        </Features>
        <Button isLoading={isLoading} logoutHandler={this.logoutHandler} />
      </HomePageNavbar>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Homepage);
