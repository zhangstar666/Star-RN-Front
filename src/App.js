import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
                   WebView {URL}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: 24,
  },
});