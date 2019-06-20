//need to make a vrbutton component that will return, can be an arratized

import React, { Component } from 'react';
import { StyleSheet, Image, VrButton } from 'react-360';
import { setCurrentVideoSource } from './Store';


class VideoCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            videoDetails: {},
            videoId: this.props.data.name,
            videoLink: this.props.data.source,
            videoThumb: this.props.data.picture,
        };
    };

    loadvideoPlayer = () => {
        setCurrentVideoSource(this.state.videoLink);
        this.props.history.push('playVideo');
    }

    render() {
        return (
            <VrButton onClick={this.loadvideoPlayer}>
                <Image style={styles.thumbnail} source={{ uri: this.state.videoThumb }} />
            </VrButton>
        );
    }
};

const styles = StyleSheet.create({
    thumbnail: {
        width: 256,
        height: 128,
        overflow: 'hidden',
    },
});

export default VideoCard;