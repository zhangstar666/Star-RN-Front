import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';

const RootStack = createStackNavigator(
  {
    Home,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class MainLayout extends React.Component {
  render() {
    return <Home />;
  }
}
