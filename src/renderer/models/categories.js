import { instance } from '../utils/gegevens';
const restaurant_id = localStorage.getItem('restaurant_id');

export default {
  namespace: 'categories',

  state: { categories: [] },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (
          pathname === '/' ||
          pathname === '/online_bestellen' ||
          pathname === '/admin/products'
        ) {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      try {
        const categories = yield select((state) => state.categories.categories);
        if (categories.length === 0) {
          const { data } = yield call(
            instance.get,
            `/api/categories/${restaurant_id}`,
          );
          yield put({ type: 'fetch/success', categories: data });
          return data;
        }
        return categories;
      } catch (e) {
        yield put({ type: 'fetch/error', error: e.message });
      }
    },
    *addCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/categories/addCategorie/${restaurant_id}`,
          payload,
        );
        console.log(data);
        yield put({
          type: 'basicinfo/categories/updateCategorie',
          categories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/categories/updateCategorie/${restaurant_id}`,
          payload,
        );
        yield put({
          type: 'basicinfo/categories/updateCategorie',
          categories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteCategorie({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/categories/deleteCategorie/${restaurant_id}`,
          payload,
        );
        yield put({
          type: 'basicinfo/categories/updateCategorie',
          categories: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    // 'fetch/start' (state, action) {
    //   return {
    //     error: null,
    //     categories: null
    //   }
    // },

    'fetch/success'(state, action) {
      return {
        error: null,
        categories: action.categories,
      };
    },

    'fetch/error'(state, action) {
      return {
        error: action.error,
        categories: [],
      };
    },
  },
};
