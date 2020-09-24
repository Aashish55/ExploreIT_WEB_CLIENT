import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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



const BookFormModal = (props) => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [errors, setErrors] = useState([]);


  const formSubmit = (event) =>{
      event.preventDefault();
      if (isFormValid(checkInDate,checkOutDate)) {
        console.log("ready to book room");
        setErrors([]);
  
        
        // axios
        //   .post(
        //     "https://explore-it-main.herokuapp.com/api/v1/users/login",
        //     loginData
        //   )
        //   .then((response) => {
        //     console.log(response.data);
        //     this.showNotification();
        //     const token = response.data.token;
        //     localStorage.setItem("jwtToken", token);
        //     setAuthorization(token);
        //     this.setState({ loading: false });
        //     window.location.reload();
        //   })
        //   .catch((error) => {
        //     let errors = [];
        //     let errorData;
        //     console.log(error);
        //     errorData = { message: "Incorrect data. Provide valid info." };
        //     this.setState({ errors: errors.concat(errorData), loading: false });
        //   });
      }
    };

  const isFormValid = (date1, date2) => {
    let error;

    if (isFormEmpty(date1,date2)) {
      error = { message: "Fill in all fields" };
      console.log(date1+ "  " + date2);
      setErrors(errors.concat(error));
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = (dateIn, dateOut) => {
    return !dateIn.length || !dateOut.length;
  };


  return (
    <Container show={props.modalStatus}>
      <Name>{props.name}</Name>
      <Subtitle>Room No: {props.room}</Subtitle>
      <Subtitle>Price: {props.price}</Subtitle>
      <form onSubmit={formSubmit}>
      <DatePicker
      selected={checkInDate}
      onChange={(date) => setCheckInDate(date)}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
      placeholderText="Enter Check In Date"
    />
    <DatePicker
      selected={checkOutDate}
      onChange={(date) => setCheckOutDate(date)}
      dateFormat="yyyy-MM-dd"
      minDate={new Date()}
      placeholderText="Enter Check Out Date"
    />
      {errors.length>0 && (
          <Error>{
              errors.map((error, i) => (
                  <p key={i} className="errorMessage">
                    {error.message}
                  </p>
                ))
          }</Error>
      )}
    <Buttons>
      <Button color={"green"} onClick={formSubmit}>Submit</Button>
      <Button color={"red"} onClick={props.closeModal}>
        Cancel
      </Button>
    </Buttons>
      </form>
    </Container>
  );
};
const Error = styled.div`
    font-size:2rem;
    color:orange;
`;
export default BookFormModal;
