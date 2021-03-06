import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Location, Permissions, Constants } from 'expo';
import Button from './Button';

class HomeScreen extends PureComponent {
  state = {
    errorMessage: null
  };

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({ errorMessage: 'This wont work in an Android emulator' });
    }
    this._requestLocationPermission();
  }

  _requestLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({ errorMessage: "Sorry, without location turned on, we can't help you" });
    }
  };

  render() {
    const { errorMessage } = this.state;
    if (errorMessage) {
      return (
        <View style={styles.container}>
          <Text>{errorMessage}</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Button {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeScreen;
