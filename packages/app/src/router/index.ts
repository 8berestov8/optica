import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import {
  PATH_ACTIONS_NEWS,
  PATH_AUTH,
  PATH_BASKET,
  PATH_CATALOG,
  PATH_CHAT,
  PATH_CHECK_DATA,
  PATH_CHECK_PROFILE,
  PATH_CHECK_RECORDING,
  PATH_CHECK_SMS,
  PATH_EDIT_PROFILE,
  PATH_FILL_PROFILE,
  PATH_HOME,
  PATH_MAP,
  PATH_ORDER,
  PATH_ORDER_HISTORY,
  PATH_ORDER_ITEM_HISTORY,
  PATH_ORDER_RECORDING,
  PATH_PARAMS,
  PATH_PICKUP,
  PATH_CATEGORIE,
  PATH_PROFILE,
  PATH_RECORD_HISTORY,
  PATH_RECORDING,
  PATH_SEARCH,
} from '@/router/constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/LayoutHome.vue'),
    children: [
      {
        path: PATH_HOME,
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
    ],
    redirect: PATH_HOME,
  },
  {
    path: PATH_RECORDING,
    component: () => import('@/layouts/LayoutHome.vue'),
    children: [
      {
        path: PATH_RECORDING,
        name: 'Recording',
        component: () => import('@/views/Recording.vue'),
      },
    ],
  },
  {
    path: PATH_BASKET,
    component: () => import('@/layouts/LayoutHome.vue'),
    children: [
      {
        path: PATH_BASKET,
        name: 'Basket',
        component: () => import('@/views/Basket.vue'),
      },
    ],
  },
  {
    path: PATH_PROFILE,
    component: () => import('@/layouts/LayoutHome.vue'),
    children: [
      {
        path: PATH_PROFILE,
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      },
    ],
  },
  {
    path: PATH_CATALOG,
    component: () => import('@/layouts/LayoutHome.vue'),
    children: [
      {
        path: PATH_CATALOG,
        name: 'Catalog',
        component: () => import('@/views/Catalog.vue'),
      },
      {
        path: PATH_SEARCH,
        name: 'Search',
        component: () => import('@/views/Search.vue'),
      },
      {
        path: PATH_CATEGORIE,
        name: 'Categorie',
        props: true,
        component: () => import('@/views/Categorie.vue'),
      },
      {
        path: PATH_PARAMS,
        name: 'Params',
        props: true,
        component: () => import('@/views/Params.vue'),
      },
    ],
  },
  {
    path: PATH_ACTIONS_NEWS,
    name: 'ActionsNews',
    props: true,
    component: () => import('@/views/ActionsNews.vue'),
  },
  {
    path: PATH_MAP,
    name: 'Map',
    component: () => import('@/views/Map.vue'),
  },
  {
    path: PATH_CHAT,
    name: 'Chat',
    component: () => import('@/views/Chat.vue'),
  },
  {
    path: PATH_AUTH,
    name: 'Auth',
    props: true,
    component: () => import('@/views/Auth.vue'),
  },
  {
    path: PATH_CHECK_SMS,
    name: 'CheckSms',
    props: true,
    component: () => import('@/views/CheckSms.vue'),
  },
  {
    path: PATH_RECORD_HISTORY,
    name: 'RecordHistory',
    component: () => import('@/views/RecordHistory.vue'),
  },
  {
    path: PATH_ORDER_HISTORY,
    name: 'OrderHistory',
    component: () => import('@/views/OrderHistory.vue'),
  },
  {
    path: PATH_ORDER_ITEM_HISTORY,
    name: 'OrderItemHistory',
    props: true,
    component: () => import('@/views/OrderItemHistory.vue'),
  },
  {
    path: PATH_EDIT_PROFILE,
    name: 'EditProfile',
    component: () => import('@/views/EditProfile.vue'),
  },
  {
    path: PATH_CHECK_PROFILE,
    name: 'CheckProfile',
    props: true,
    component: () => import('@/views/CheckProfile.vue'),
  },
  {
    path: PATH_FILL_PROFILE,
    name: 'FillProfile',
    props: true,
    component: () => import('@/views/FillProfile.vue'),
  },
  {
    path: PATH_PICKUP,
    name: 'Pickup',
    props: true,
    component: () => import('@/views/Pickup.vue'),
  },
  {
    path: PATH_ORDER,
    name: 'Order',
    component: () => import('@/views/Order.vue'),
  },
  {
    path: PATH_CHECK_RECORDING,
    name: 'CheckRecording',
    component: () => import('@/views/CheckRecording.vue'),
  },
  {
    path: PATH_CHECK_DATA,
    name: 'CheckData',
    component: () => import('@/views/CheckData.vue'),
  },
  {
    path: PATH_ORDER_RECORDING,
    name: 'OrderRecording',
    component: () => import('@/views/OrderRecording.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
