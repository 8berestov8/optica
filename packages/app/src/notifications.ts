import { PushNotifications } from '@capacitor/push-notifications';
import { addFCMToken } from '@/api/user';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { FCM } from '@capacitor-community/fcm';
import { UserInterfase } from './interfaces/UserInterfase';

export const pushNotifications = {
  OnInit() {
    try {
      if (Capacitor.getPlatform() !== 'web') {
        this.registerPush();
      }
    } catch (e) {
      console.error(e);
    }
  },

  async handleToken(user: UserInterfase) {
    const info = await Device.getInfo();
    if (Capacitor.getPlatform() !== 'web') {
      FCM.getToken()
        .then(async (r) => await addFCMToken(r.token, info.platform, user))
        .catch((err) => console.error(err));
    } else {
      await addFCMToken('TOKEN', info.platform, user);
    }
  },

  async registerPush() {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    this.addListeners();
    await PushNotifications.register();
  },
  async addListeners() {
    PushNotifications.addListener('registrationError', (error) => {
      // eslint-disable-next-line
      console.error('Error: ' + JSON.stringify(error));
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async addListenernReceive(
    done = (_i: any) => {
      console.log(_i);
    }
  ) {
    PushNotifications.addListener(
      'pushNotificationReceived',
      async (notification) => {
        done(notification);
      }
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async addListenerActionPerformed(
    done = (_i: any) => {
      console.log(_i);
    }
  ) {
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      async (notification) => {
        const { data } = notification.notification;
        done(data);
      }
    );
  },

  async subscribeTo(userId: any) {
    const topic = `user${userId}`;
    FCM.subscribeTo({ topic })
      .then(() => console.log(`subscribed to topic “${topic}”`))
      .catch((err) => console.error(err));
  },
  async unsubscribeFrom(userId: any) {
    const topic = `user${userId}`;
    FCM.unsubscribeFrom({ topic })
      .then(() => console.log(`unsubscribe from topic “${topic}”`))
      .catch((err) => console.error(err));
  },

  async setReadedAllNotifications() {
    PushNotifications.removeAllDeliveredNotifications();
  },
};
