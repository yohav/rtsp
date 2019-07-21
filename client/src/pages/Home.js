import React, {Component, Fragment} from 'react';
import {
    HeaderBar, inputStyle,
    LinkButtons,
    loginButton, logoutButton,
    registerButton, addURLButton,myUrlsButton
} from '../components';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import config from '../config';

const title = {
  pageTitle: 'Home Screen',
};

const loading = {
    margin: '1em',
    fontSize: '24px',
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isLoggedIn: false,
            url: "",
            isGoodUrl: false,
            addedUrl: false
        };
        this.handleURLChange = this.handleURLChange.bind(this);
        this.addURL = this.addURL.bind(this);
    }

    async componentDidMount() {
        const accessString = localStorage.getItem('JWT');
        if (accessString == null) {
            this.setState({
                isLoading: false
            });
        } else {
            this.setState({
                isLoading: false,
                isLoggedIn: true
            });
        }
    }

    handleURLChange = (event) => {
        let url = event.target.value;
        let regex = new RegExp(config.urlPattern);
        let isGoodUrl = regex.test(url);
        this.setState({
            url: url,
            isGoodUrl: isGoodUrl,
            addedUrl: false
        });
    };

    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('JWT');
        this.setState({
            isLoggedIn: false
        });
    };

    addURL = async (event) => {
        const accessString = localStorage.getItem('JWT');
        const response = await axios.post(`${config.serverUrl}/stream`, {
            url: this.state.url
        }, {
            headers: {
                Authorization: `JWT ${accessString}`
            }
        });
        if(response.data === "success"){
            this.setState({
                addedUrl: true,
                url: ""
            });
        }
        console.log(response);
    };

    render() {
        const {
            isLoggedIn,
            isLoading,
            isGoodUrl,
            addedUrl,
            url
        } = this.state;

        if (isLoading) {
            return (
                <div>
                    <HeaderBar title={title} />
                    <div style={loading}>Loading...</div>
                </div>
            );
        }
        return (
            <div className="home-page">
                <HeaderBar title={title} />
                {!isLoggedIn ? (
                    <Fragment>
                        <LinkButtons buttonText="Register" buttonStyle={registerButton} link="/register"/>
                        <LinkButtons buttonText="Login" buttonStyle={loginButton} link="/login" />
                    </Fragment>
                ) : (
                    <Fragment>
                        <TextField
                            style={inputStyle}
                            id="url"
                            label="RTSP URL"
                            value={url}
                            onChange={this.handleURLChange}
                            placeholder="RTSP URL"
                            type="text"
                        />
                        <Button
                            style={addURLButton}
                            variant="contained"
                            color="primary"
                            disabled={!isGoodUrl}
                            onClick={this.addURL}>
                            Add URL
                        </Button>
                        <LinkButtons
                            buttonText="My Streams"
                            buttonStyle={myUrlsButton}
                            link="/myurls"
                        />
                        <Button
                            style={logoutButton}
                            variant="contained"
                            color="primary"
                            onClick={this.logout}>
                            Logout
                        </Button>
                        {addedUrl && (
                            <div>
                                <p>Successfully Added URL!</p>
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
        );
    }
}


export default Home;
