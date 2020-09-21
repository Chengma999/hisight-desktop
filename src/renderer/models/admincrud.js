import axios from 'axios';
const target = localStorage.getItem('target');
export default {
  namespace: 'admincrud',

  state: {},

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        // if (pathname.includes("/admin/orders")){
        //    dispatch({type:'ordersFetch',payload:({pathname})})
        // }
      });
    },
  },
  effects: {
    *update({ payload }, { call, put }) {
      const { id } = payload;
      try {
        const { data } = yield call(
          axios.post,
          `${target}/api/admincrud/update`,
          payload,
        );
        yield put({ type: 'update/success', isSucceeded: true, id });
      } catch (e) {
        yield put({ type: 'update/error', error: e.message, id });
      }
    },
    *add({ payload }, { call, put }) {
      const { id } = payload;
      try {
        const { data } = yield call(
          axios.post,
          `${target}/api/admincrud/add`,
          payload,
        );
        yield put({ type: 'add/success', isSucceeded: true, id });
      } catch (e) {
        console.log(e);
        yield put({ type: 'add/error', error: e.message, id });
      }
    },
    *delete({ payload }, { call, put }) {
      const { id } = payload;
      try {
        const { data } = yield call(
          axios.post,
          `${target}/api/admincrud/delete`,
          payload,
        );
        yield put({ type: 'delete/success', isSucceeded: true, id });
      } catch (e) {
        yield put({ type: 'delete/error', error: e.message, id });
      }
    },
    *ordersFetch({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          axios.get,
          `${target}/api/admincrud/ordersfetch`,
        );
        yield put({ type: 'ordersFetch/success', orders: data });
        return data;
      } catch (e) {
        yield put({ type: 'ordersFetch/error', error: e.message });
      }
    },
    *orderPrint({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          axios.post,
          `${target}/api/admincrud/orderprint`,
          payload,
        );
        yield put({ type: 'orderPrint/success', isSucceeded: data });
      } catch (e) {
        yield put({ type: 'orderPrint/error', error: e.message });
      }
    },

    *sms_send({ payload }, { call, put }) {
      const { orderId } = payload;
      try {
        const { data } = yield call(
          axios.post,
          `${target}/api/admincrud/sms_send`,
          payload,
        );
        yield put({ type: 'sms_send/success', isSucceeded: true, orderId });
      } catch (e) {
        yield put({ type: 'sms_send/error', error: e.message, orderId });
      }
    },
    *reservationsFetch({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          axios.get,
          `${target}/api/reserveren`,
        );
        yield put({ type: 'reservationsFetch/success', reservations: data });
        return data;
      } catch (e) {
        yield put({ type: 'reservationsFetch/error', error: e.message });
      }
    },
  },

  reducers: {
    'update/success'(state, action) {
      const update_id = 'update_' + action.id;
      return {
        ...state,
        [update_id]: {
          error: null,
          isSucceeded: action.isSucceeded,
          id: action.id,
        },
      };
    },

    'update/error'(state, action) {
      const update_id = 'update_' + action.id;
      return {
        ...state,
        [update_id]: {
          error: action.error,
          isSucceeded: false,
          id: action.id,
        },
      };
    },
    'add/success'(state, action) {
      const add_id = 'add_' + action.id;
      return {
        ...state,
        [add_id]: {
          error: null,
          isSucceeded: action.isSucceeded,
          id: action.id,
        },
      };
    },
    'add/error'(state, action) {
      const add_id = 'add_' + action.id;
      return {
        ...state,
        [add_id]: {
          error: action.error,
          isSucceeded: false,
          id: action.id,
        },
      };
    },
    'delete/success'(state, action) {
      const delete_id = 'delete_' + action.id;
      return {
        ...state,
        [delete_id]: {
          id: action.id,
          error: null,
          isSucceeded: action.isSucceeded,
        },
      };
    },
    'delete/error'(state, action) {
      const delete_id = 'delete_' + action.id;
      return {
        ...state,
        [delete_id]: {
          id: action.id,
          error: action.error,
          isSucceeded: false,
        },
      };
    },
    'ordersFetch/success'(state, action) {
      return {
        ...state,
        ordersFetch: {
          error: null,
          orders: action.orders,
        },
      };
    },
    'ordersFetch/error'(state, action) {
      return {
        ...state,
        ordersFetch: {
          error: action.error,
          orders: [],
        },
      };
    },
    'orderPrint/success'(state, action) {
      return {
        ...state,
        orderPrint: {
          error: null,
          isSucceeded: action.isSucceeded,
        },
      };
    },
    'orderPrint/error'(state, action) {
      return {
        ...state,
        orderPrint: {
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
    'reservationsFetch/success'(state, action) {
      return {
        ...state,
        reservationsFetch: {
          error: null,
          reservations: action.reservations,
        },
      };
    },
    'reservationsFetch/error'(state, action) {
      return {
        ...state,
        reservationsFetch: {
          error: action.error,
          reservations: [],
        },
      };
    },
  },
};
