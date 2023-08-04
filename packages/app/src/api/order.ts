import API from '@/api/index';
//TODO API Interfaces

// @ts-ignore
export const sendOrderDetails = async (params: any): Promise<undefined> => {
  try {
    const a = params.map((el: any) => {
      console.log(el);
      const data = {
        product: el.product,
        product_amount: el.product_amount,
        product_count: el.product_count,
        product_discount: el.product_discount,
        sphere: el.sphere,
        radius: el.radius,
        add: el.add,
        axis: el.ax,
        dominant: el.dominant,
        cylinder: el.cylinder,
        categorie: el.categorie,
      };

      return API.post(`/order-product-details`, { data })
        .then((data: any) => data.data.id)
        .catch((e) => console.error(e));
    });
    // @ts-ignore
    return Promise.all(a);
  } catch (e) {
    console.error(e);
  }
};

// @ts-ignore
export const sendOrder = async (params: any): Promise<undefined> => {
  try {
    const data = {
      order_product_details: params.order_details,
      count: params.order.count,
      total_amount: params.order.total_amount,
      total_discount: params.order.total_discount,
      status_delivery: 1,
      user: {
        id: params.order.user,
      },
    };

    const res = API.post(`/orders`, { data });
    // @ts-ignore
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getOrderHistory = async (params: any): Promise<undefined> => {
  try {
    return API.get(`/orders?populate=*&filters[user][id]=${params}`)
      .then(({ data }: any) => {
        return data.map((el: any) => {
          return {
            id: el.id,
            date: el.attributes.createdAt,
            count: el.attributes.count,
            price: el.attributes.total_discount,
            deliverTo: el.attributes.deliverTo.data,
            status: el.attributes.status_delivery.data?.attributes.title,
          };
        });
      })
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const getOrderById = async (params: any): Promise<undefined> => {
  try {
    // @ts-ignore
    return API.get(`/orders/${params}?populate=*`)
      .then(async ({ data }) => {
        console.log(data);

        return Promise.all(
          data.attributes.order_product_details.data.map((el: any) => {
            return API.get(`/order-product-details/${el.id}?populate=*`)
              .then(async (el) => {
                const product = await API.get(
                  `/products/${el.data.attributes.product.data.id}?populate=*`
                ).then((el: any) => {
                  return el.data.attributes.image.data.map((e: any) => {
                    return e.attributes.url;
                  });
                });

                console.log(el);

                return {
                  product: {
                    id: el.data.attributes.product.data.id,
                    title: el.data.attributes.product.data.attributes.title,
                    short_title:
                      el.data.attributes.product.data.attributes.short_title,
                    price: el.data.attributes.product.data.attributes.price,
                    discount:
                      el.data.attributes.product.data.attributes.discount,
                    img: product,
                  },

                  price: el.data.attributes.product_discount,
                  count: el.data.attributes.product_count,
                  radius: {
                    id: el.data.attributes?.radius?.data?.id,
                    title: el.data.attributes?.radius?.data?.attributes?.title,
                  },
                  sphere: {
                    id: el.data.attributes?.sphere?.data?.id,
                    title: el.data.attributes?.sphere?.data?.attributes?.title,
                  },
                  add: {
                    id: el.data.attributes?.add?.data?.id,
                    title: el.data.attributes?.add?.data?.attributes?.title,
                  },
                  ax: {
                    id: el.data.attributes?.axi?.data?.id,
                    title: el.data.attributes?.axi?.data?.attributes?.title,
                  },
                  cylinder: {
                    id: el.data.attributes?.cylinder?.data?.id,
                    title:
                      el.data.attributes?.cylinder?.data?.attributes?.title,
                  },
                  dominant: {
                    id: el.data.attributes?.dominant?.data?.id,
                    title:
                      el.data.attributes?.dominant?.data?.attributes?.title,
                  },
                  categorie: {
                    id: el.data.attributes?.categorie?.data?.id,
                    title:
                      el.data.attributes?.categorie?.data?.attributes?.title,
                  },
                };
              })
              .catch((e: any) => console.error(e));
          })
        ).then((results: any) => {
          console.log(results);
          return {
            id: data.id,
            date: data.attributes.createdAt,
            count: results.count,
            order_product_details: results,
            total_amount: data.attributes.total_amount,
            total_discount: data.attributes.total_discount,
            status: data.attributes.status_delivery.data?.attributes.title,
            deliverTo: data.attributes.deliverTo?.data
              ? data.attributes.deliverTo?.data.attributes
              : '',
          };
        });
      })
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};
