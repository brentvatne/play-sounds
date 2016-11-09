import Exponent, { Asset, Components } from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

class App extends React.Component {
  state = {
    ready: false,
    selected: false,
    paused: true,
  }

  async componentWillMount() {
    await Asset.fromModule(require('./assets/sounds/sound2.m4a')).downloadAsync();
    this.setState({ready: true});
  }

  _toggleSwitch = () => {
    this.setState({selected: !this.state.selected});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected && !this.state.selected) {
      this.setState({paused: true});
      this._sound.seek(0);
    } else if (!prevState.selected && this.state.selected) {
      this.setState({paused: false});
    }
  }

  render() {
    if (!this.state.ready) {
      return <Components.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <Components.Video
          source={require('./assets/sounds/sound2.m4a')}
          ref={sound => { this._sound = sound; }}
          repeat={true}
          paused={this.state.paused}
          style={styles.razorSoundVideo}
        />

        <Switch
          value={this.state.selected}
          onValueChange={this._toggleSwitch}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  razorSoundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
});

Exponent.registerRootComponent(App);
