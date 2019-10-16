import { Actions, Router, Scene, Stack } from 'react-native-router-flux';
import React, { Component } from 'react';

import Connections from './scenes/Connections.js';
import Home from './scenes/Home';
import SubscriptionsScreen from './scenes/subscriptions/SubscriptionsScreen';

export default class App extends Component {
  onBackPress = () => {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  };
  render() {
    return (
      <Router backAndroidHandler={this.onBackPress}>
        <Stack key="root" hideNavBar>
          <Scene key="home" component={Home} title="Home" />
          <Scene
            key="connections"
            component={Connections}
            title="Connections"
          />
          <Scene
            key="subscriptions"
            component={SubscriptionsScreen}
            title="Subscriptions"
            initial={true}
          />
        </Stack>
      </Router>
    );
  }
}
