import axios from 'axios';
const target = localStorage.getItem('target');
export default {
  namespace: 'products',

  state: {},

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((props) => {
        if (props.pathname === '/' || props.pathname === '/admin/products') {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      try {
        const { data } = yield call(axios.get, `${target}/api/products`);
        yield put({ type: 'fetch/success', products: data });
      } catch (e) {
        yield put({ type: 'fetch/error', error: e.message });
      }
    },
  },

  reducers: {
    'fetch/success'(state, action) {
      return {
        error: null,
        products: action.products,
      };
    },

    'fetch/error'(state, action) {
      return {
        error: action.error,
        products: null,
      };
    },
  },
};
