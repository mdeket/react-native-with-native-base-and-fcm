/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
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
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
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
