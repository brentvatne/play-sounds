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
  }

  async componentWillMount() {
    await Asset.fromModule(require('./assets/sounds/sound2.m4a')).downloadAsync();
    this.setState({ready: true});
  }

  _toggleSwitch = () => {
    this.setState({selected: !this.state.selected});
  }

  render() {
    if (!this.state.ready) {
      return <Components.AppLoading />;
    }

    return (
      <View style={styles.container}>
        { this.state.selected && (
          <Components.Video
            source={require('./assets/sounds/sound2.m4a')}
            repeat={true}
            style={styles.razorSound}
          />
        ) }

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
  razorSound: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  },
});

Exponent.registerRootComponent(App);
