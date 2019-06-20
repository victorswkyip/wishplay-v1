//Author: Victor Yip
//Refactor on May 24, 2019
//when screen loads, load the video details
//take the first video from that list and push it to an array
//once 3 items have been pushed, take the array and push it to a larger array
//start a new row with a new row factor
//once 3 rows have been pushed, hold and prepare to render next page if requested
//clicks and animations are dynamic 
//


import React, { Component } from 'react';
import { StyleSheet, Environment, Text, View, VrButton, staticAssetURL, NativeModules } from 'react-360';
import VideoCard from './VideoCard';
import facebookAPI from '../../api/facebookAPI';
import VideoModule from 'VideoModule';

const maxX = 3;
const maxY = 3;
const VIDEO_PLAYER = 'bgPlayer';


class FacebookVideoFeed extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      listOfGroups: [],
      userSubscriptions: [],
      userFeed: [],
    };

  }

  //occurs when middlepanel successfully renders
  componentDidMount() {
   
    this.player = VideoModule.createPlayer(VIDEO_PLAYER);
    this.player.play({
      source: { url: 'https://storage.googleapis.com/wishplay-v1/sunrise-beach.mp4'},
      stereo: '2D',
      muted: false,
      volume: 0.1,
    });

    Environment.setBackgroundVideo(VIDEO_PLAYER);

    this.getListOfGroups();
    this.getFBVideoList();
  }

  componentWillUnmount() {
    VideoModule.destroyPlayer(VIDEO_PLAYER);
  }


  getListOfGroups() {
    facebookAPI.getDataUsingFacebookAPI('/me/groups?fields=picture,name,administrator&', this.props.authToken).then((response) => {
      let listOfGroups = response.data.data.filter((group) => {
        return group.administrator;
      });
      this.setState({
        listOfGroups,

      });
      let userSubscriptions = this.state.listOfGroups;

      this.getUserFeed(userSubscriptions);

    });
  }

  getUserFeed(userSubscriptions) { //this is really get vieos from group
    let userFeed = this.state.userFeed;
    userSubscriptions.forEach((subscription) => {
      facebookAPI.getDataUsingFacebookAPI('/' + subscription.id + '/videos?fields=type,source,object_id,story,picture,likes,comments,description,caption,height,length&limit=50', this.props.authToken).then((response) => {
        userFeed = [...userFeed, ...response.data.data];
        this.setState({
          userFeed,
        });
      });
    });
  }


  getFBVideoList(/*[Tags]*/) {

    let userFeed = this.state.userFeed;
    let response = this.state.userSubscriptions;

    userFeed = [...userFeed, ...response];

    this.setState({
      userFeed,
    });
  }

  //this function will map the videoList to a useable array
  getFBVideoCardList() { //should get some page number perhaps
    return this.state.userFeed.map((userFeed) => {
      return userFeed;
    });
  }

  renderFBUserFeed() {
    return (
      <View style={styles.container} >
        {this.renderFBVideoCardGrid()}
      </View>
    );
  }

  renderFBVideoCardGrid() {
    let grid = [];
    for (y = 0; y < maxY; y++) {
      grid.push(
        this.renderFBVideoCardList(y)
      )
    }
    return (
      <View>
        {grid}
      </View>
    );
  }

  renderFBVideoCardList(y) {
    let list = [];
    for (x = 0; x < maxX; x++) {
      list.push(
        this.renderFBVideoCard(x, y)
      )
    }
    return (
      <View key={y} style={styles.card}>
        {list}
      </View>
    );
  }

  renderFBVideoCard(x, y) {
    let feed = this.getFBVideoCardList();
    let index = (maxX * y) + x;
    if (index >= feed.length) {
      return null;
    }
    else {
      return (
        <VideoCard key={index} data={feed[index]} {...this.props} />
      );
    }
  }

  render() {

    return (
      <View>
        {this.renderFBUserFeed()}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  panel: {
    // Fill the entire surface 
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 256,
    height: 128,
    padding: 5,
    flexDirection: 'row',
  },
  listText: {
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default FacebookVideoFeed;