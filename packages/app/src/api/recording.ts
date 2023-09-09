import API from '@/api/index';

export const getDoctor = async (): Promise<undefined> => {
  try {
    return API.get(`doctors?populate=*`)
      .then(({ data }: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const checkDate = async (params: any): Promise<undefined> => {
  try {
    return API.get(
      `recordings?populate=*&filters[appointments][date]=${params}&filters[appointments][reserved]=true`
    )
      .then(({ data }: any) =>
        data.map((el: any) => {
          return el.attributes.time;
        })
      )
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const getTime = async (): Promise<undefined> => {
  try {
    return API.get(`recordings?populate=*`)
      .then(({ data }: any) =>
        data.map((el: any) => {
          return { time: el.attributes.time, id: el.id };
        })
      )
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const sendRecord = async (data: any) => {
  try {
    return API.post(`appointments?populate=recording`, { data })
      .then(({ data }: any) => {
        console.log(data);
        return {
          id: data.id,
          booked: data.attributes.booked,
          date: data.attributes.date,
          reserved: data.attributes.reserved,
          service: data.attributes.service,
          reserve: data.attributes.reserved,
          time: data.attributes.recording.data.attributes.time,
          visit: data.attributes.visit,
        };
      })
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const getRecordHistory = async (data: any): Promise<undefined> => {
  try {
    return API.get(
      `appointments?populate=*&filters[visit]=true&filters[user][id]=${data}}`
    )
      .then(({ data }: any) => {
        return data.map((el: any) => {
          return {
            date: el.attributes.date,
            time: el.attributes.recording.data?.attributes.time,
            doctor: el.attributes.doctor.data?.attributes.name,
            service: el.attributes.service,
          };
        });
      })
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const getRecordingById = async (data: any) => {
  try {
    return API.get(
      `appointments?populate=recording&filters[reserved]=true&filters[user][id]=${data.id}&filters[date][$gt]=${data.date}`
    )
      .then(({ data }: any) => {
        if (data.length) {
          return {
            id: data[0].id,
            booked: data[0].attributes.booked,
            date: data[0].attributes.date,
            reserved: data[0].attributes.reserved,
            service: data[0].attributes.service,
            reserve: data[0].attributes.reserved,
            time: data[0].attributes.recording.data.attributes.time,
            visit: data[0].attributes.visit,
          };
        }
      })
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};

export const cancelRecording = async (data: any) => {
  try {
    return API.put(`appointments/${data.id}`, { data: { reserved: false } })
      .then(({ data }: any) => data)
      .catch((e: any) => console.error(e));
  } catch (e) {
    console.error(e);
  }
};
