import { PushNotifications } from '@capacitor/push-notifications';
import {UserInterfase} from '@/interfaces/UserInterfase'
import {addFCMToken} from '@/api/user'
import {Platform} from 'cordova-res/dist/platform'
import {Capacitor} from '@capacitor/core'
import {Device} from '@capacitor/device'


let currentUser: UserInterfase

let registered = false

const handleToken = async (token: {value: string}, device = 'Unknown') => {
    console.info('Registration token: ', token.value);
  console.log('User '+currentUser.id+' joined via Native device with token '+token.value)

  if(currentUser) {
      const call = async () => {
        const result = await addFCMToken(token.value, device, currentUser)
        console.log(`User ${currentUser.id} updated fcm token `+result)
      }
      call()
    }

}
const addListeners = async () => {
  registered = true
  if(!Capacitor.isNativePlatform()) {
     const info = await Device.getInfo();
    const value = 'TOKEN'
    console.log('User '+currentUser.id+' joined via browser with token '+value)
    await handleToken({value},JSON.stringify(info) )
  } else {
    await PushNotifications.addListener('registration', handleToken);

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }
}

export const registerNotifications = async (user: UserInterfase) => {
  currentUser = user
  if(!registered)
    await addListeners()

  if(Capacitor.isNativePlatform()) {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications();
  console.log('delivered notifications', notificationList);
}
