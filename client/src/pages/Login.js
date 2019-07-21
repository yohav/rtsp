/* eslint-disable no-console */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
  pageTitle: 'Login Screen',
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      showError: false,
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  loginUser = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (username === '' || password === '') {
      this.setState({
        showError: false,
        showNullError: true,
        loggedIn: false
      });
    } else {
      try {
        const response = await axios.post(`${config.serverUrl}/user/login`, {
          username,
          password,
        });
        localStorage.setItem('JWT', response.data.token);
        this.setState({
          loggedIn: true,
          showError: false,
          showNullError: false
        });
      } catch (error) {
        console.error(error.response.data);
        if (
          error.response.data === 'Unauthorized'
        ) {
          this.setState({
            showError: true,
            showNullError: false
          });
        }
      }
    }
  };

  render() {
    const {
      username,
      password,
      showError,
      loggedIn,
      showNullError,
    } = this.state;
    if (!loggedIn) {
      return (
        <div>
          <HeaderBar title={title} />
          <form className="profile-form" onSubmit={this.loginUser}>
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
            <SubmitButtons buttonStyle={loginButton} buttonText="Login" />
          </form>
          {showNullError && (
            <div>
              <p>The username or password cannot be null.</p>
            </div>
          )}
          {showError && (
            <div>
              <p>
                That username or password isn&apos;t recognized. Please try
                again or register now.
              </p>
              <LinkButtons
                buttonText="Register"
                buttonStyle={registerButton}
                link="/register"
              />
            </div>
          )}
          <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
        </div>
      );
    }
    return <Redirect to={'/'} />;
  }
}

export default Login;
