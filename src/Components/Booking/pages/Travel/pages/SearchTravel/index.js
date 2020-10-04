import React, { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from "axios";

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
        `http://localhost:5003/api/v1/travels`,
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
    <div>
      <div>
        <input
          type="text"
          value={from}
          name="from"
          placeholder="From"
          onChange={handleInput}
        />
        <input
          type="text"
          value={to}
          name="to"
          placeholder="To"
          onChange={handleInput}
        />
        <DatePicker
          selected={departureDate}
          onChange={(date) => setForm({ ...form, departureDate: date })}
        />
        <button onClick={handleTravelSearch}>Submit</button>
      </div>
      <div>
        {travels &&
          travels.map((travel) => (
            <div
              onClick={() =>
                props.history.push(`/booking/travel/${travel._id}`)
              }
            >
              <p>Bus No. {travel.vehicle.no}</p>
              <p>Price {travel.price}</p>
              <p>
                Departure{" "}
                {moment(new Date(travel.departureDate)).format(
                  "YYY/MM/DD HH:mm"
                )}{" "}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchTravel;
