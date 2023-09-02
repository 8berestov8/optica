import { UserInterfase } from '@/interfaces/UserInterfase';
import API from '@/api/index';
import { pushNotifications } from '@/notifications';

export const sendPhone = async (params: object) => {
  try {
    const res = await API.post(`/sms/signup`, params);
    console.log(res);
  } catch (e) {
    console.error(e);
  }
};

export const checkSms = async (
  params: object
): Promise<UserInterfase | undefined> => {
  try {
    const { user, jwt }: any = await API.post(`/sms/callback`, params);

    const User: UserInterfase = {
      id: 0,
      firstname: '',
      lastname: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: '',
    };

    User.id = user.id;
    User.firstname = user.firstname;
    User.lastname = user.lastname;
    User.patronymic = user.patronymic;
    User.birthday = user.birthday;
    User.email = user.email;
    User.phone = user.phone;

    if (jwt) {
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('user', JSON.stringify(User));
    }

    await pushNotifications.handleToken(User);
    await pushNotifications.subscribeTo(User.id);

    return User;
  } catch (e) {
    console.error(e);
  }
};

let fcmToken: string;

export const addFCMToken = async (
  token: string,
  device: string,
  user: UserInterfase
): Promise<Partial<UserInterfase>> => {
  fcmToken = token;
  try {
    const data: any = await API.post(`/sms/fcm`, {
      data: { token, device, userId: user.id },
    });

    return data;
  } catch (e) {
    console.error(e);
  }
  return undefined as any as UserInterfase;
};

export const deleteFCMToken = async (
  user: UserInterfase
): Promise<Partial<UserInterfase>> => {
  try {
    if (fcmToken) {
      const data: any = await API.delete(`/sms/fcm`, {
        data: { token: fcmToken, userId: user.id },
      });

      return data;
    }
  } catch (e) {
    console.error(e);
  }
  return undefined as any as UserInterfase;
};

export const updateUser = async (
  params: any
): Promise<UserInterfase | undefined> => {
  try {
    const req = {
      firstname: params.firstname,
      lastname: params.lastname,
      patronymic: params.patronymic,
      birthday: params.birthday,
    };
    if (params.email) {
      // @ts-ignore
      req['email'] = params.email;
    }

    const data: any = await API.put(`/users/${params.id}`, req);

    const User: UserInterfase = {
      id: 0,
      firstname: '',
      lastname: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: '',
    };

    User.id = data.id;
    User.firstname = data.firstname;
    User.lastname = data.lastname;
    User.patronymic = data.patronymic;
    User.birthday = data.birthday;
    User.email = data.email;
    User.phone = data.phone;

    localStorage.setItem('user', JSON.stringify(User));

    return User;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (
  params: any
): Promise<UserInterfase | undefined> => {
  try {
    const res = await API.get(`/users/${params}?populate=*`);

    const user: UserInterfase = {
      id: 0,
      firstname: '',
      lastname: '',
      patronymic: '',
      birthday: '',
      email: '',
      phone: '',
    };

    user.id = res.id;
    user.firstname = res.firstname;
    user.lastname = res.lastname;
    user.patronymic = res.patronymic;
    user.birthday = res.birthday;
    user.email = res.email;
    user.phone = res.phone;

    localStorage.setItem('user', JSON.stringify(user));
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const removeUser = async (params: any): Promise<undefined> => {
  try {
    const res = await API.delete(`/users/${params}`);
    console.log(res);
    // @ts-ignore
    return res;
  } catch (e) {
    console.error(e);
  }
};
