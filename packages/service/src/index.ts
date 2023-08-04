import { Strapi } from '@strapi/strapi';
import fireAdmin from './fire-admin'

export default {
  register: async ( { strapi }: { strapi: Strapi }) => {

    console.log('register')
    // ...
  },
  bootstrap: async ({ strapi }) => {

    //Make Firebase available everywhere



    strapi.sendPush = fireAdmin.messaging().sendMulticast
  }
};
