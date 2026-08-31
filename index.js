import { AppRegistry } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';
import {
  handleNotificationClick,
  recordDeliveredNotification,
} from './src/notifee/notifications';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS && detail.notification) {
    handleNotificationClick(detail.notification);
  } else if (type === EventType.DELIVERED && detail.notification) {
    recordDeliveredNotification(detail.notification);
  }
});

AppRegistry.registerComponent(appName, () => App);
