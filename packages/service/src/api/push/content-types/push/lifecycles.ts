import {Strapi, StrapiInterface} from '@strapi/strapi'
import types, {RelationPatch} from '../../../../strapi-extended'
import fireAdmin from '../../../../fire-admin'
const R = require('ramda')

const si: StrapiInterface = strapi as any

const tailN = value => {
  const str = JSON.stringify(value)
  return str.length < 200 ? str : R.take(50, str) + '...'
}
const inferParams = (event): [any, Partial<{
  id: number
  publishedAt: any
}>] =>
  [event.params.where,event.params.data]


module.exports = {
    beforeUpdate: async (event) => {
      const [where, patch] = inferParams(event)
      const pushPopulated = await strapi.db.query('api::push.push').findOne({where})
      console.log('Push beforeUpdate', {where,patch})
      if(!pushPopulated.publishedAt  && patch.publishedAt) {
          const newPush = {...pushPopulated, ...patch}
          const {userId, title, body} = newPush

          const fcms = await strapi.db.query('api::fcm.fcm').findMany({
            where: {
              userId,
            }
          })
          const tokens = fcms.map(f => f.token)
          if(tokens.length) {
            console.log("Broadcast "+title+" "+body+" for "+tokens.length+" devices")
            try {
            const result = await    fireAdmin.messaging().sendMulticast({
                notification: {
                  body,
                  title
                },
              tokens
              }
            )
            console.log("Broadcast result", result)
              } catch(error) {
              console.log("Broadcast error", error)
            }
          }
        }

      console.info('EvENT: ', event)
    },


  }
