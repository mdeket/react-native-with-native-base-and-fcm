/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Root} from "native-base";
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator
} from "react-navigation";
import SideBar from "./src/navigation/SideBar";
import ProfileScreen from "./src/screens/ProfileScreen";
import ArrivalsScreen from "./src/screens/ArrivalsScreen";
import {colors} from "./src/index.constants";
import firebase from 'react-native-firebase';



const Drawer = createDrawerNavigator(
    {
      Profile: {screen: ProfileScreen},
      Arrivals: {screen: ArrivalsScreen},
    },
    {
      initialRouteName: "Profile",
      contentOptions: {
        activeTintColor: colors.mainColor
      },
      contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = createStackNavigator(
    {
      Drawer: {screen: Drawer},
    },
    {
      initialRouteName: "Drawer",
      headerMode: "none"
    }
);

const AppContainer = createAppContainer(AppNavigator);
//
// export default () =>
//     <Root>
//       <AppContainer/>
//     </Root>;


export default class App extends Component<Props> {


  async pushNotificaitonHandler() {
    // const fcmToken = await firebase.messaging().getToken();
    // console.log(fcmToken)
    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      // user has permissions


      const notificationDisplayedListener = firebase.notifications()
      // @ts-ignore
      .onNotificationDisplayed((notification) => {});

      // Triggered when the notification is received and the application is in the foreground
      const notificationListener = firebase.notifications()
      // @ts-ignore
      .onNotification((notification) => {
        console.log('*********************** onNotification');
      });

      // Triggered when the received notification is being opened
      const notificationOpenedListener = firebase.notifications()
      // @ts-ignore
      .onNotificationOpened((notificationOpened) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpened.action;
        // Get information about the notification that was opened
        const notification = notificationOpened.notification;
        console.log('*********************** onNotificationOpened');
      });


      // Triggered when the notification is opened while the application is closed
      const notificationOpen: any = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        // App was opened by a notification
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log('*********************** getInitialNotification');
      }

      console.log(enabled)
      const fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log(fcmToken)
      } else {
        // user doesn't have a device token yet
      }
    }
  }


  async componentDidMount(): void {
    await this.pushNotificaitonHandler();
  }

  render() {
    return (
        <Root>
          <AppContainer/>
        </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
