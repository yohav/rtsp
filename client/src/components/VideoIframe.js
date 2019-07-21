import React, { Fragment } from 'react';
import PropTypes from 'prop-types';


const videoIframeUrl = `https://wcs5-eu.flashphoner.com:8888/embed_player?urlServer=wss://wcs5-eu.flashphoner.com:8443&mediaProviders=WebRTC,Flash,MSE,WSPlayer&streamName=`;
const VideoIframe = ({videoUrl, onLoad}) => (
    <Fragment>
        <iframe id='fp_embed_player'
                src={`${videoIframeUrl}${videoUrl}`}
                onLoad={onLoad}
                title='video-stream'
                marginWidth='0' marginHeight='0' frameBorder='0' width='100%' height='100%' scrolling='no'
                allowFullScreen='allowfullscreen'></iframe>
    </Fragment>
);

VideoIframe.propTypes = {
    videoUrl: PropTypes.string.isRequired
};

export default VideoIframe;
