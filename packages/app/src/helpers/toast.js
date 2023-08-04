import { toastController } from '@ionic/vue';

export const showToast = async (message, duration = 1500, color = 'none') => {
  const toast = await toastController.create({
    message,
    duration,
    cssClass: color,
  });
  await toast.present();
};
