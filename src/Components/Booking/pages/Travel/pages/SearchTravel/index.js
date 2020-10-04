import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from "axios";
import styled from "styled-components";

const SearchTravel = (props) => {
  const [form, setForm] = useState({
    departureDate: new Date(),
    from: "",
    to: "",
  });

  const [travels, setTravels] = useState();

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTravelSearch = () => {
    const { departureDate, from, to } = form;
    axios
      .post(
        `https://explore-it-travel.herokuapp.com/api/v1/travels`,
        {
          from,
          to,
          departureDate,
        },
        { headers: { exploreItToken: localStorage.getItem("jwtToken") } }
      )
      .then(({ data }) => {
        setTravels(data);
      });
  };

  const { departureDate, from, to } = form;

  return (
    <PageWrapper>
      <InputsWrapper>
        <InputWrapper>
          <Input
            type="text"
            value={from}
            name="from"
            placeholder="From"
            onChange={handleInput}
          />
          <Input
            type="text"
            value={to}
            name="to"
            placeholder="To"
            onChange={handleInput}
          />
        </InputWrapper>
        <DatePickerContainer>
          <label>Departure Date</label>
          <DatePicker
            wrapperClassName="datepicker-wrapper"
            selected={departureDate}
            onChange={(date) => setForm({ ...form, departureDate: date })}
          />
        </DatePickerContainer>
        <Button onClick={handleTravelSearch}>Submit</Button>
      </InputsWrapper>
      <div>
        {travels &&
          travels.map((travel) => (
            <TravelContainer
              onClick={() =>
                props.history.push(`/booking/travel/${travel._id}`)
              }
            >
              <p>Bus No. {travel.vehicle.no}</p>
              <p>Price {travel.price}</p>
              <p>
                Departure{" "}
                {moment(new Date(travel.departureDate)).format(
                  "YYYY/MM/DD HH:mm"
                )}{" "}
              </p>
            </TravelContainer>
          ))}
      </div>
    </PageWrapper>
  );
};

const Input = styled.input`
  font-size: 15px;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 3px;
  width: 150px;
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
  margin: 3rem 0;
`;

const InputWrapper = styled.div``;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DatePickerContainer = styled.div`
  display: flex;
  font-size: 15px;
  align-items: center;
  label {
    margin-right: 20px;
  }

  input {
    padding: 10px !important;
    border: 1px solid #999 !important;
    border-radius: 3px !important;
    width: 150px !important;
  }
`;

const TravelContainer = styled.div`
  padding: 20px;
  border-radius: 3px;
  background-color: #f0f0f0;
  cursor: pointer;
  margin: 20px 0;
  p {
    margin: 10px 0;
    font-size: 15px;
  }
`;

export default SearchTravel;
