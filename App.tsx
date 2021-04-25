import React, {useEffect} from 'react';
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";

import Routes from "./src/routes";

import {useFonts, Jost_400Regular, Jost_600SemiBold} from "@expo-google-fonts/jost";
import {PlantProps} from './src/libs/storage';

export default function App() {

  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })


  useEffect(() => {

    getAllScheduledNotifications()

  }, [])

  async function addNotificationsReceivedListener() {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps
        console.log("addNotificationsReceivedListener ==>", data)
      })
    return () => subscription.remove()
  }

  async function getAllScheduledNotifications() {
    const data = await Notifications.getAllScheduledNotificationsAsync()
    console.log("getAllScheduledNotifications ==>", data)
  }

  async function deleteAllScheduleNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}
