//Author: Victor Yip
//Goal: Develop an app to browse immersive media from various providers
//TopPanel renders a selection switch between various providers
//MiddlePanel renders a user specfic feed based on various factors
//Solidify program architecture with Aframe, Redux, Express
//The next panel will render more user specific feed details an allow for feed customization


import React, { Component } from 'react';
import { AppRegistry } from 'react-360';
import { MemoryRouter as Router, Redirect, Route, Switch } from 'react-router';
import FacebookVideoFeed from './src/components/FacebookVideoFeed';
import VideoPlayer from './src/components/VideoPlayer';


class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            userIsAuthenticated: false,
        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/"
                        render={(routeProps) => (
                            <FacebookVideoFeed {...routeProps} {...this.props} />
                        )} />
                    <Route exact path="/playVideo"
                        render={(routeProps) => (
                            <VideoPlayer {...routeProps} {...this.props} />
                        )} />
                </Switch>
            </Router>
        )
    }
}
 
 
AppRegistry.registerComponent('App', () => App); 