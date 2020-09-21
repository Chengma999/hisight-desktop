import axios from 'axios';
import { routerRedux } from 'dva/router';
import { socket } from '../services/socket';
import { printInit } from '../services/print';
const asyncLocalStorage = {
  setItem: function (key, value) {
      return Promise.resolve().then(function () {
          localStorage.setItem(key, value);
      });
  },
  getItem: function (key) {
      return Promise.resolve().then(function () {
          return localStorage.getItem(key);
      });
  }
};

export default {
  namespace: 'login',

  state: {},

  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  },

  effects: {
    *login({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          axios.post,
          `https://www.ouheng.nl/api/settings/auth`,
          payload,
        );
        const { doc } = data;
        const { token, namespace, restaurantType, reservationOverview,hide, target } = doc;
        yield call(asyncLocalStorage.setItem, 'jwtToken', token);
        yield call(asyncLocalStorage.setItem, 'target', target);
        yield call(asyncLocalStorage.setItem, 'namespace', namespace);
        yield call(asyncLocalStorage.setItem, 'restaurantType', restaurantType);
        yield call(asyncLocalStorage.setItem, 'reservationOverview', reservationOverview);
        yield call(asyncLocalStorage.setItem, 'hide', hide);
        socket(namespace, restaurantType);
        printInit(hide);
        yield put(routerRedux.push('/admin'));
        window.location.reload()
      } catch (e) {
        console.log(e);
      }
    },
  },

  reducers: {
    add(state, action) {
      console.log(action);
      const { data } = action;

      return {
        s: 1,
      };
    },
  },
};
