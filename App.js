import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/header';
import Footer from './components/footer';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Text>Open up App.js to start working on your app!</Text>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
