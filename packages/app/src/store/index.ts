import { createStore } from 'vuex';
import {
  getProducts,
  getProduct,
  getCharacteristics,
  filterProducts,
} from '@/api/products';
import { checkSms, getUser, sendPhone, updateUser } from '@/api/user';
import { OrderProductDetails, Product } from '@/interfaces/ProductInterface';
import { saveAddress, getAddress } from '@/api/address';
import { getDoctor } from '@/api/recording';
import { getCategories } from '@/api/categories';
import { Categorie } from '@/interfaces/CategorieInterface';

const modules = {};

const store = createStore({
  state: {
    popover: {
      show: false,
      message: [],
    },
    error: null,
    filter: {
      type: [],
      period: [],
      sphere: {},
      radius: {},
      add: {},
      ax: {},
      cylinder: {},
      dominant: {},
    },
    categories: Array<Categorie>(),
    products: Array<Product>(),
    characteristics: {
      type: [],
      period: [],
      sphere: [],
      radius: [],
      adds: [],
      axes: [],
      cylinders: [],
      dominants: [],
    },
    user: {},
    token: '',
    basket: {
      order_product_details: Array<OrderProductDetails>(),
      count: 0,
      total_amount: 0,
      total_discount: 0,
      user: 0,
    },
    order: '',
    recording: {
      time: null,
      date: null,
      service: null,
    },
    previous_recording: {},
    optic_address: {},
    doctor: {},
    order_history: [],
    loading: false,
  },
  getters: {
    popover: (state) => state.popover,
    error: (state) => state.error,
    filter: (state) => state.filter,
    products: (state) => state.products,
    categories: (state) => state.categories,
    order_product_details: (state) => state.basket.order_product_details,
    basket_count: (state) => state.basket.count,
    total_amount: (state) => state.basket.total_amount,
    total_discount: (state) => state.basket.total_discount,
    basket_user: (state) => state.basket.user,
    type: (state) => state.characteristics.type,
    period: (state) => state.characteristics.period,
    sphere: (state) => state.characteristics.sphere,
    radius: (state) => state.characteristics.radius,
    adds: (state) => state.characteristics.adds,
    axes: (state) => state.characteristics.axes,
    cylinders: (state) => state.characteristics.cylinders,
    dominants: (state) => state.characteristics.dominants,
    user: (state) => state.user,
    token: (state) => state.token,
    basket: (state) => state.basket,
    order: (state) => state.order,
    time: (state) => state.recording.time,
    date: (state) => state.recording.date,
    service: (state) => state.recording.service,
    optic_address: (state) => state.optic_address,
    doctor: (state) => state.doctor,
    previous_recording: (state) => state.previous_recording,
    loading: (state) => state.loading,
  },
  mutations: {
    SET_POPOVER: (state, payload) => (state.popover = payload),
    SET_ERROR: (state, payload) => (state.error = payload),
    SET_FILTER: (state, payload) => (state.filter = payload),
    SET_CATEGORIES: (state, payload) => (state.categories = payload),
    SET_PRODUCTS: (state, payload) => (state.products = payload),
    SET_ORDER_PRODUCT_DETAILS: (state, payload: OrderProductDetails) =>
      state.basket.order_product_details.push(payload),
    SET_ORDER_PRODUCT_DETAILS_FULL: (state, payload) =>
      (state.basket.order_product_details = payload),
    SET_BASKET_COUNT: (state) =>
      (state.basket.count = state.basket.order_product_details
        .map((el) => el.product_count)
        .reduce((a, b) => Number(a) + Number(b), 0)),
    SET_TOTAL_AMOUNT: (state) =>
      (state.basket.total_amount = state.basket.order_product_details
        .map((el) => el.product_amount)
        .reduce((a, b) => Number(a) + Number(b), 0)),
    SET_TOTAL_DISCOUNT: (state) =>
      (state.basket.total_discount = state.basket.order_product_details
        .map((el) => el.product_discount)
        .reduce((a, b) => Number(a) + Number(b), 0)),
    SET_BASKET_USER: (state, payload) => (state.basket.user = payload),
    SET_TYPE: (state, payload) => (state.characteristics.type = payload),
    SET_PERIOD: (state, payload) => (state.characteristics.period = payload),
    SET_SPHERE: (state, payload) => (state.characteristics.sphere = payload),
    SET_RADIUS: (state, payload) => (state.characteristics.radius = payload),
    SET_ADDS: (state, payload) => (state.characteristics.adds = payload),
    SET_AXES: (state, payload) => (state.characteristics.axes = payload),
    SET_CYLINDERS: (state, payload) =>
      (state.characteristics.cylinders = payload),
    SET_DOMINANTS: (state, payload) =>
      (state.characteristics.dominants = payload),
    SET_USER: (state, payload) => (state.user = payload),
    SET_TOKEN: (state, payload) => (state.token = payload),
    SET_BASKET: (state, payload) => (state.basket = payload),
    SET_ORDER: (state, payload) => (state.order = payload),
    SET_DATE: (state, payload) => (state.recording.date = payload),
    SET_TIME: (state, payload) => (state.recording.time = payload),
    SET_SERVICE: (state, payload) => (state.recording.service = payload),
    SET_OPTIC_ADDRESS: (state, payload) => (state.optic_address = payload),
    SET_DOCTOR: (state, payload) => (state.doctor = payload),
    SET_PREVIOUS_RECORDING: (state, payload) =>
      (state.previous_recording = payload),
    SET_LOADING: (state, payload) => (state.loading = payload),
  },
  actions: {
    setError(context, error) {
      context.commit('SET_ERROR', error);
    },
    async getCategories(context: any) {
      context.commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        getCategories()
          .then((data) => {
            context.commit('SET_CATEGORIES', data);
            resolve(data);
            context.commit('SET_LOADING', false);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getProducts(context: any, params?: object) {
      context.commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        getProducts(params)
          .then((data) => {
            context.commit('SET_PRODUCTS', data);
            resolve(data);
            context.commit('SET_LOADING', false);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },

    async getProduct(context: any, params?: object) {
      context.commit('SET_LOADING', true);
      const product = await getProduct(params);
      context.commit('SET_LOADING', false);
      return product;
    },

    async getTypes(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('types')
          .then((data) => {
            context.commit('SET_TYPE', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getPeriod(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('periods')
          .then((data) => {
            context.commit('SET_PERIOD', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getRadius(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('radii')
          .then((data) => {
            context.commit('SET_RADIUS', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getSphere(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('spheres')
          .then((data) => {
            context.commit('SET_SPHERE', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getAdds(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('adds')
          .then((data) => {
            context.commit('SET_ADDS', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },

    async getAxes(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('axes')
          .then((data) => {
            context.commit('SET_AXES', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },

    async getCylinders(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('cylinders')
          .then((data) => {
            context.commit('SET_CYLINDERS', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },

    async getDominants(context: any) {
      return new Promise((resolve, reject) => {
        getCharacteristics('dominants')
          .then((data) => {
            context.commit('SET_DOMINANTS', data);
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },

    async filterProducts(context: any) {
      context.commit('SET_LOADING', true);
      return new Promise((resolve, reject) => {
        filterProducts(context.getters.filter)
          .then((data) => {
            context.commit('SET_PRODUCTS', data);
            resolve(data);
            context.commit('SET_LOADING', false);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async sendPhone(context: any, params?: any) {
      return new Promise((resolve, reject) => {
        sendPhone(params)
          .then((data) => {
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async checkSmsCode(context: any, params?: any) {
      return new Promise((resolve, reject) => {
        checkSms(params)
          .then((data) => {
            debugger
            context.commit('SET_USER', data);
            context.commit('SET_TOKEN', localStorage.getItem('jwt'));
            localStorage.removeItem('phone');
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async updateUser(context: any, params?: any) {
      return new Promise((resolve, reject) => {
        updateUser(params)
          .then((data) => {
            resolve(data);
          })
          .catch((e) => {
            console.error(e);
            reject(e);
          });
      });
    },
    async getUser(context: any, params?: any) {
      getUser(params)
        .then((data) => {
          context.commit('SET_USER', data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async saveAddress(context: any, params?: any) {
      saveAddress(params)
        .then((data: any) => data)
        .catch((e: any) => {
          console.error(e);
        });
    },
    async getAddress(context: any, params?: any) {
      return getAddress(params)
        .then(({ data }: any) => data)
        .catch((e: any) => {
          console.error(e);
        });
    },
    async getDoctor(context: any) {
      return getDoctor()
        .then((data: any) => {
          // @ts-ignore
          const doctor = {
            id: data[0].id,
            avatar: data[0].attributes.avatar.data.attributes.url,
            email: data[0].attributes.email,
            name: data[0].attributes.name,
            phone: data[0].attributes.phone,
            optica: data[0].attributes.optica,
          };
          context.commit('SET_DOCTOR', doctor);
          getAddress({ type: 'optic', id: data[0].attributes.optica.data.id })
            .then(({ data }: any) => {
              context.commit('SET_OPTIC_ADDRESS', data[0].attributes);
            })
            .catch((e: any) => {
              console.error(e);
            });
        })
        .catch((e: any) => {
          console.error(e);
        });
    },
  },
  modules,
});

export default store

