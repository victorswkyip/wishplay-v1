import React, { Component } from 'react';
import VideoModule from 'VideoModule';
import * as Environment from 'Environment';
import { getCurrentVideoSource } from './Store';

const VIDEO_PLAYER = 'dash_video';
/*
const VIDEO_SOURCE = [
  {
    url: '',
    fileFormat: 'mp4',
  },
];
*/
class VideoPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url: getCurrentVideoSource(),
      fileFormat: 'mp4'
    }
  }

  componentDidMount() {
     this.player = VideoModule.createPlayer(VIDEO_PLAYER);
    this.player.addListener('onVideoStatusChanged', (event) => {
      if (event.status === 'finished') {
        VideoModule.destroyPlayer(VIDEO_PLAYER);
        this.props.history.goBack();
      }
    });


    VideoModule.play(VIDEO_PLAYER, {
      source: this.state,
      layout: 'CUBEMAP_32',
      muted: false,
    });

    //Environment.setScreen('default', VIDEO_PLAYER, 'default', 0, 0, 1000, 600);
    Environment.setBackgroundVideo(VIDEO_PLAYER)
  }

  render() {
    return null;
  }
}

export default VideoPlayer;