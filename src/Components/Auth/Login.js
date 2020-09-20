import React, { Component } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import Notification from "../Notification/Notification";
import { setAuthorization } from "../../utils/setAuthorization";
import { connect } from "react-redux";
import { setUser } from "../../action/index";
import styled from 'styled-components';

const SubmitText = styled.h4`
  color:white;
  line-height:1rem;
  font-size:2rem;
  font-weight:600;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: [],
    top: -100,
    loading: false,
  };

  loginHandler = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      console.log("ready to login");
      this.setState({ errors: [], loading: true });

      const loginData = {
        loginInfo: this.state.email,
        password: this.state.password,
      };
      axios
        .post(
          "https://explore-it-main.herokuapp.com/api/v1/users/login",
          loginData
        )
        .then((response) => {
          console.log(response.data);
          this.showNotification();
          const token = response.data.token;
          localStorage.setItem("jwtToken", token);
          setAuthorization(token);
          this.setState({ loading: false });
          window.location.reload();
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

  showNotification = () => {
    this.setState({ top: 16 }, () => {
      setTimeout(() => {
        this.setState({ top: -100 });
      }, 3000);
    });
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

  isFormEmpty = ({ email, password }) => {
    return !email.length || !password.length;
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displayErrors = (errors) =>
    errors.map((error, i) => (
      <p key={i} className="errorMessage">
        {error.message}
      </p>
    ));

  render() {
    const { email, password, errors, top, loading } = this.state;

    return (
      <React.Fragment>
        <div className="section">
          <div className="leftPart">
            <div className="textArea">
              <h1 className="title">ExploreIT</h1>
              <p className="secondary_text">Some Text Here...</p>
            </div>
            <h2 className="arrowRight">&rsaquo;</h2>
          </div>
          <form className="form" onSubmit={this.loginHandler}>
            <h3 className="orangeHeading">Login</h3>

            <h4>Email</h4>
            <input
              className="input"
              name="email"
              onChange={this.handleChange}
              value={email}
              type="email"
            />

            <h4>Password</h4>
            <input
              className="input"
              type="password"
              name="password"
              onChange={this.handleChange}
              value={password}
            />

            {errors.length > 0 && (
              <div className="errorSection">
                Error:
                {this.displayErrors(errors)}
              </div>
            )}

            <button className="submit" disabled={loading} onClick={this.loginHandler}>
            {loading?
              <BeatLoader size={10} color='white' loading/> :
              <SubmitText>Login</SubmitText>
              }
            
            </button>

            <p className="switch_text">
              Don't have an Account ?{" "}
              <Link to="/registration">Register Here.</Link>{" "}
            </p>
          </form>
        </div>
        <Notification message={"User Login Successful."} topPosition={top} />
      </React.Fragment>
    );
  }
}

export default connect(null, { setUser })(Login);
