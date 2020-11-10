import { instance } from '../utils/gegevens';

const restaurant_id = localStorage.getItem('restaurant_id');
export default {
  namespace: 'admincrud',

  state: { fetchOrders: { orders: [] }, printOrder: {} },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname.includes('/admin/orders')) {
          dispatch({ type: 'fetchOrders', payload: { pathname } });
        }
      });
    },
  },
  effects: {
    *fetchOrders({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          instance.get,
          `/api/admincrud/fetchOrders/${restaurant_id}`,
        );
        yield put({ type: 'fetchOrders/success', orders: data });
      } catch (e) {
        yield put({ type: 'fetchOrders/error', error: e.message });
      }
    },
    *printOrder({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/admincrud/printOrder/${restaurant_id}`,
          payload,
        );
        yield put({ type: 'printOrder/success', isSucceeded: data });
      } catch (e) {
        yield put({ type: 'printOrder/error', error: e.message });
      }
    },

    *sms_send({ payload }, { call, put }) {
      const { orderId } = payload;
      try {
        const { data } = yield call(
          instance.post,
          '/api/admincrud/sms_send',
          payload,
        );
        yield put({ type: 'sms_send/success', isSucceeded: true, orderId });
      } catch (e) {
        yield put({ type: 'sms_send/error', error: e.message, orderId });
      }
    },
  },

  reducers: {
    'fetchOrders/success'(state, { orders }) {
      return {
        ...state,
        fetchOrders: {
          error: null,
          orders,
        },
      };
    },
    'fetchOrders/error'(state, action) {
      return {
        ...state,
        fetchOrders: {
          error: action.error,
          orders: [],
        },
      };
    },
    'printOrder/success'(state, action) {
      return {
        ...state,
        printOrder: {
          error: null,
          isSucceeded: action.isSucceeded,
        },
      };
    },
    'printOrder/error'(state, action) {
      return {
        ...state,
        printOrder: {
          error: action.error,
          isSucceeded: false,
        },
      };
    },
    'sms_send/success'(state, action) {
      const sms_orderId = 'sms' + action.orderId;
      return {
        ...state,
        [sms_orderId]: {
          error: null,
          isSucceeded: action.isSucceeded,
          orderId: action.orderId,
        },
      };
    },
    'sms_send/error'(state, action) {
      const sms_orderId = 'sms' + action.orderId;
      return {
        ...state,
        [sms_orderId]: {
          error: action.error,
          isSucceeded: false,
          orderId: action.orderId,
        },
      };
    },
    listenOrder(state, { payload }) {
      const ordersArr = state.fetchOrders.orders.slice();
      const { order } = payload;
      //avoid duplicated orders from socket
      const index = ordersArr.findIndex((item) => item._id === order._id);
      if (index > -1) {
        return { ...state };
      }
      ordersArr.push(order);
      const fetchOrders = { orders: [...ordersArr] };
      return {
        ...state,
        fetchOrders,
      };
    },
  },
};
