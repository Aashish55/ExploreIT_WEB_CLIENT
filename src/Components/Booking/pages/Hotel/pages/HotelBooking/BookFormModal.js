import React, { Component } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css";
import axios from "axios";
import Notification from "../../../../../Notification/Notification";

const Container = styled.div`
  font-weight: 500;
  color: black;
  font-size: 1.8rem;
  position: relative;
  z-index: 500;
  background-color: #e1eff6;
  width: 70%;
  border-radius: 1rem;
  padding: 16px;
  left: 15%;
  top: 30%;
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  transform: ${(props) =>
    props.show ? "translateY(0)" : "translateY(-100vh)"};
  opacity: ${(props) => (props.show ? "1" : "0")};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Name = styled.div`
  font-size: 3.5rem;
  color: #c54409;
  padding-bottom: 1rem;
`;
const Subtitle = styled.div`
  font-size: 2.2rem;
  color: gray;
  padding-bottom: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  background-color: ${(props) => props.color};
  color: #f8f8f8;
  font-size: 2.2rem;
  padding: 1rem 3rem;
  outline: none;
  border: none;
  border-radius: 1rem;
  margin: 2rem 2rem;
  cursor: pointer;
`;

class BookFormModal extends Component {
  formSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      console.log("ready to book room");
      this.setState({ errors: [] });
      this.setState({ errors: [], loading: true });
      // console.log(this.state);
      const bookingData = {
        checkInDate: this.state.checkInDate,
        checkOutDate: this.state.checkOutDate,
        bookingInfo: [{
            room: this.state.roomID,
            price: this.state.priceID,
          }]
      };
      axios
        .post(
          "https://explore-it-hotel.herokuapp.com/api/v1/bookings",
          bookingData,
          {
            headers: {
              fromapigateway: true,
              exploreItToken: localStorage.getItem("jwtToken"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.showNotification();
          this.setState({ loading: false });
        })
        .catch((error) => {
          let errors = [];
          let errorData;
          console.log(error);
          errorData = { message: "Incorrect data. Provide valid info." };
          this.setState({ errors: errors.concat(errorData), loading: false });
        });
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ checkInDate, checkOutDate }) => {
    return !checkInDate.length || !checkOutDate.length;
  };

  handleChangeCheckIn = (date) => {
    const checkindate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    this.setState({ checkInDate: checkindate });
  };
  handleChangeCheckOut = (date) => {
    const checkoutdate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    this.setState({ checkOutDate: checkoutdate });
  };

  showNotification = () => {
    this.setState({ top: -200 }, () => {
      setTimeout(() => {
        this.setState({ top: -500 });
      }, 3000);
    });
  };

  state = {
    checkInDate: "",
    checkOutDate: "",
    roomID: this.props.roomID,
    priceID: this.props.priceID[0],
    jwtToken: localStorage.getItem("jwtToken"),
    errors: [],
    loading: false,
    top: -500,
  };
  render() {
    const { checkInDate, checkOutDate, errors, top } = this.state;
    return (
      <Container show={this.props.modalStatus}>
        <Name>{this.props.name}</Name>
        <Subtitle>Room No: " {this.props.room} "</Subtitle>
        <Subtitle>Price: " {this.props.price} "</Subtitle>
        <form onSubmit={this.formSubmit}>
          <DatePicker
            value={checkInDate}
            onChange={(date) => this.handleChangeCheckIn(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Enter Check In Date"
          />
          <DatePicker
            value={checkOutDate}
            onChange={(date) => this.handleChangeCheckOut(date)}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Enter Check Out Date"
          />
        </form>
        {errors.length > 0 && (
          <Error>
            {errors.map((error, i) => (
              <p key={i} className="errorMessage">
                {error.message}
              </p>
            ))}
          </Error>
        )}
        <Buttons>
          <Button color={"green"} onClick={this.formSubmit}>
            Submit
          </Button>
          <Button color={"red"} onClick={this.props.closeModal}>
            Cancel
          </Button>
        </Buttons>
        <Notification message={"Booking Successful."} topPosition={top} />
      </Container>
    );
  }
}

export default BookFormModal;

const Error = styled.div`
  font-size: 2rem;
  color: orange;
`;
