import '@strapi/strapi'
import types from '../schemas'
import {messaging} from 'firebase-admin'
import {Messaging} from 'firebase-admin/lib/messaging'

declare module '@strapi/strapi' {
    interface StrapiInterface {
        sendPush:  Messaging['sendMulticast']
    }
}


export type RelationPatch = {
  connect: {id: number, end?: boolean}[]
  disconnect: {id: number, end?: boolean}[]
}
