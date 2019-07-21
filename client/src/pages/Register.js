/* eslint-disable no-console */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import config from '../config';

import {
  LinkButtons,
  SubmitButtons,
  registerButton,
  homeButton,
  loginButton,
  inputStyle,
  HeaderBar,
} from '../components';

const title = {
  pageTitle: 'Register Screen',
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      messageFromServer: '',
      showError: false,
      registerError: false,
      loginError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  registerUser = async (e) => {
    e.preventDefault();
    const {username, password} = this.state;
    if (username === '' || password === '') {
      this.setState({
        showError: true,
        loginError: false,
        registerError: true
      });
    } else {
      try {
        const response = await axios.post(
            `${config.serverUrl}/user/register`,
            {
              username,
              password,
            },
        );
        console.log(response);
        this.setState({
          messageFromServer: response.data,
          showError: false,
          loginError: false,
          registerError: false,
        });
      } catch (error) {
        console.error(error.response.data);
        if (error.response.data === 'Unauthorized') {
          this.setState({
            showError: true,
            loginError: true,
            registerError: false,
          });
        }
      }
    }
  };

  render() {
    const {
      username,
      password,
      messageFromServer,
      showError,
      loginError,
      registerError,
    } = this.state;

    if (messageFromServer === '') {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.registerUser}>
            <TextField
              style={inputStyle}
              id="username"
              label="username"
              value={username}
              onChange={this.handleChange('username')}
              placeholder="Username"
            />
            <TextField
              style={inputStyle}
              id="password"
              label="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
              type="password"
            />
            <SubmitButtons buttonStyle={registerButton} buttonText="Register" />
          </form>
          {showError === true && registerError === true && (
            <div>
              <p>Username and password are required fields.</p>
            </div>
          )}
          {showError === true && loginError === true && (
            <div>
              <p>
                That username is already taken. Please choose another or login.
              </p>
              <LinkButtons
                buttonText="Login"
                buttonStyle={loginButton}
                link="/login"
              />
            </div>
          )}
          <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
        </div>
      );
    }
    if (messageFromServer === 'success') {
      return (
        <div>
          <HeaderBar title={title} />
          <h3>User successfully registered!</h3>
          <LinkButtons
            buttonText="Go Login"
            buttonStyle={loginButton}
            link="/login"
          />
        </div>
      );
    }
  }
}

export default Register;
