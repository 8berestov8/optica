import API from '@/api/index';
//TODO API Interfaces
export const saveAddress = async (params: any): Promise<undefined> => {
  try {
    const data = {
      street: params.street,
      apartment: params.apartment,
      entrance: params.entrance,
      floor: params.floor,
      order: params.order,
      user: params.user,
    };
    return API.post(`/addresses?populate=${params.type}`, { data })
      .then((data: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const getAddress = async (params: any): Promise<undefined> => {
  try {
    return API.get(
      `/addresses?populate=${params.type}&filters[${params.type}]=${params.id}`
    )
      .then((data: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const updateAddress = async (params: any): Promise<undefined> => {
  try {
    const data = {
      street: params.street,
      apartment: params.apartment,
      entrance: params.entrance,
      floor: params.floor,
      order: params.order,
      user: params.user,
    };

    return API.put(`/addresses/${params.id}`, { data })
      .then((data: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};
