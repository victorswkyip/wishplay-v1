import * as React from 'react';
/**
 * If you want to share data between multiple root components, you'll need a
 * global store like Redux. This is similar to building a web app where you
 * want to synchronize data between a sidebar and a main view - just extended
 * into three dimensions.
 * To simplify this sample, we implement a trivial Redux-like store that will
 * ensure all of our elements are synchronized.
 */
const State = {
  currentIndex: 1,
  accessToken: "",
  currentVideo: "",
};

const listeners = new Set();


function updateComponents() {
  for (const cb of listeners.values()) {
    cb();
  }
}

export function setCurrent(value) {
  State.currentIndex = value;
  updateComponents();
}
 
export function setCurrentVideoSource(value) {
  State.currentVideo = value;
  updateComponents();
}

export function getCurrentVideoSource(){
  return State.currentVideo;
}

export function connect(Component) {
  return class Wrapper extends React.Component {
    state = {
      currentIndex: State.currentIndex,
      accessToken: State.accessToken,

    };

    _listener = () => {
      this.setState({
        currentIndex: State.currentIndex,
        accessToken: State.accessToken,

      });
    };

    componentDidMount() {
      listeners.add(this._listener);
    }

    componentWillUnmount() {
      listeners.delete(this._listener);
    }

    render() {
      return (
        <Component
          {...this.props}
          currentIndex={this.state.currentIndex}
          accessToken={this.state.accessToken}
        />
      );
    }
  };
}