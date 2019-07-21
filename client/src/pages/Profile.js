import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

import {
  LinkButtons,
  loginButton,
  HeaderBar,
  homeButton
} from '../components';
import VideoIframe from "../components/VideoIframe";
import StreamTable from "../components/StreamTable";

const loading = {
  margin: '1em',
  fontSize: '24px',
};

const title = {
  pageTitle: 'My Streams',
};

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streams: [],
      isLoadingUser: true,
      isLoadingVideo: false,
      error: false,
      selectedLink: ""
    };
    this.onSelectStream = this.onSelectStream.bind(this);
    this.onVideoLoad = this.onVideoLoad.bind(this);
  }

  async componentDidMount() {
    const accessString = localStorage.getItem('JWT');
    if (accessString == null) {
      this.setState({
        isLoadingUser: false,
        error: true,
      });
    } else {
      try {
        const response = await axios.get(`${config.serverUrl}/user/streams`, {
          headers: { Authorization: `JWT ${accessString}` }
        });
        this.setState({
          streams: response.data,
          isLoadingUser: false,
          error: false
        });
      } catch (error) {
        this.setState({
          error: true
        });
      }
    }
  }

  onSelectStream(url){
    console.log(url);
    this.setState({
      selectedLink: url,
      isLoadingVideo: true
    })
  }

  onVideoLoad(){
    this.setState({
      isLoadingVideo: false
    })
  }

  render() {
    const {
      streams,
      error,
      isLoadingUser,
      isLoadingVideo,
      selectedLink
    } = this.state;

    if (error) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>
            Problem fetching user data. Please login again.
          </div>
          <LinkButtons
            buttonText="Login"
            buttonStyle={loginButton}
            link="/login"
          />
        </div>
      );
    }
    if (isLoadingUser) {
      return (
        <div>
          <HeaderBar title={title} />
          <div style={loading}>Loading User Data...</div>
        </div>
      );
    }
    return (
      <div>
        <HeaderBar title={title} />
        {streams.length === 0 && (
            <div style={loading}>No Streams, please add one in home page</div>
        )}
        <StreamTable streams={streams} onSelectStream={this.onSelectStream}/>
        {isLoadingVideo && (
            <div style={loading}>Loading Stream...</div>
        )}
        {selectedLink && (
            <div className={isLoadingVideo ? 'hide' : 'video-frame'}>
              <VideoIframe videoUrl={selectedLink} onLoad={this.onVideoLoad}/>
            </div>
        )}
        <LinkButtons buttonText="Go Home" buttonStyle={homeButton} link="/" />
      </div>
    );
  }
}

export default Profile;
