import { Strapi } from '@strapi/strapi';
const R = require('ramda');
import {DateTime} from 'luxon'
import {RelationPatch} from '../../../../strapi-extended'
import {AsyncReturnType} from 'type-fest'

const toISOString = (obj: DateTime | string) =>
  obj instanceof  DateTime ? obj.toJSDate().toISOString() : obj
const selectStatus = async (statusId: number): Promise<{id: number, title: string}> =>
  await strapi.db.query('api::status-delivery.status-delivery').findOne({where:{id: statusId}})


const inferParams = (event): [any, Partial<{
  status_delivery: RelationPatch,
  deliverTo: RelationPatch
}>] =>
    [event.params.where,event.params.data]

const createPush = async ({userId, title, body, publishAt}: Partial<{userId, title, body, publishAt: DateTime|string}>) => {
  const data = {
    publish_at:toISOString( (publishAt || DateTime.now())),
    userId: userId,
    title: title || 'Оптика ОЗ',
    body
  }
  console.log('create push', data)
  return await strapi.entityService.create('api::push.push', {
    data
  })
}

const publishPush = async (id) =>
  await strapi.entityService.update('api::push.push',id, {
    data: {
      publishedAt:toISOString(DateTime.now()),
    }
  })

const selectOrderProductDetails = async (order: OrderPopulated) :Promise<{
  product: {id: number, title , price, short_title },
  product_count
} >=>
  await strapi.db.query('api::order-product-detail.order-product-detail').findOne({
  where: {id: order.order_product_details[0].id},
  populate: ['product']
})
type DetailsPopulated = AsyncReturnType<typeof selectOrderProductDetails>


const selectProductPopulatedByDetails = async (details: DetailsPopulated) : Promise<{
  period: any
  title: string
} > => await strapi.db.query('api::product.product').findOne({
  where: {id: details.product.id},
  populate: ['period']
})

const selectPopulatedOrder = async (where) =>
  await strapi.db.query('api::order.order')
    .findOne({where,populate: ['status_delivery', 'user','order_product_details']}) as Partial< {
    id: number
    user: {id: number }
    status_delivery: { id: number, title: string}
    order_product_details: {
      id : number
      product_count:number
      product_amount:number
      product_discount: number
    }[],
  }>
type OrderPopulated = AsyncReturnType<typeof selectPopulatedOrder>


const getUpdatedStatusDeliveryId = (patch) =>
  patch.status_delivery && patch.status_delivery.connect && patch.status_delivery.connect.length  && patch.status_delivery.connect[0].id

module.exports ={
    beforeUpdate: async (event) => {
      const [where, patch] = inferParams(event)

      console.log('Order beforeUpdate', {where,patch})
      const prevOrder = await selectPopulatedOrder(where)
      const details = await selectOrderProductDetails(prevOrder)
      if (!details.product) {
        console.log('no products , skip', details)
        return
      }

      const productItem = await selectProductPopulatedByDetails(details)
      const userId = prevOrder.user.id
      const connectedStatusId = getUpdatedStatusDeliveryId(patch)


      if(connectedStatusId) {
          const nextStatusDelivery = await selectStatus(connectedStatusId)
          const nowDateTime = DateTime.now()
          const push = await createPush({
              publishAt:toISOString(nowDateTime),
              userId,
              body: `${nextStatusDelivery.title} - по вашему заказу №${prevOrder.id}, обновлён статус`
          })
          try {
            await publishPush(push.id)
          } catch(e){
            console.error(e)
          }
          console.log('connectedStatusId',connectedStatusId)
        if(connectedStatusId === 7) {

            const lensPeriodDays = Number(productItem.period.title)
            const pscPerPackage = lensPeriodDays === 1 ? 3 : 1
            const days = lensPeriodDays * details.product_count * pscPerPackage
            console.log({days, lensPeriodDays, pscPerPackage})
            if(lensPeriodDays === 1) {
              const dateTimes = []
              let nowVl = nowDateTime.setZone('UTC+10')
              if(nowVl.hour >= 21)
                nowVl = nowVl.plus({days: 1}).startOf('day').plus({hours: 21})
              else
                nowVl = nowVl.startOf('day').plus({hours: 21})
              for(let i = 0; i < days; i++) {
                dateTimes.push(nowVl)
                nowVl = nowVl.plus({days: 1})
              }
              console.log('Dayli pushes dateTimes  ',dateTimes.map(d => d.toISODate()))
            }

            if (days > 5) {
              //for(let i = 5; i > 0; i --) {
                const publishAt = nowDateTime.plus({days: days - 5})
                console.log('Last 5 days  push   ',publishAt)
                await createPush({
                  publishAt: publishAt,
                  userId,
                  body: `Ваши линзы скоро закончатся. Не забудьте заказать новые!`
                })
              //}
            }


         }
          console.log('productItem', productItem)
        }

    },
    afterUpdate: async (event)  => {

      console.log('Order afterUpdated ', event);
    },
  }
