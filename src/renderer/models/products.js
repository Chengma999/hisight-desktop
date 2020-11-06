import {instance} from '../utils/gegevens'
const restaurant_id = localStorage.getItem('restaurant_id');

export default {
  namespace: "products",

  state: {
    products: [],
    succeedId: null,
    updateSucceed: false,
    deleteSucceed: false,
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen((props) => {
        if (
          props.pathname === "/" ||
          props.pathname === "/online_bestellen" ||
          props.pathname === "/admin/products"
        ) {
          dispatch({ type: "fetch" });
        }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put, select }) {
      // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      try {
        const products = yield select((state) => state.products.products);
        if (products.length === 0) {
          const { data } = yield call(
            instance.get,
            `/api/products/${restaurant_id}`
          );
          yield put({ type: "fetch/success", products: data });
        }
        return;
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
    *addProduct({ payload }, { call, put }) {
      try {
        const { data } = yield call(
          instance.post,
          "/api/products/addProduct",
          payload
        );
        yield put({ type: "add", products: data });
      } catch (e) {
        yield put({ type: "fetch/error", error: e.message });
      }
    },
    *updateProduct({ payload }, { call, put, select }) {
      const { oldId, id } = payload;
      try {
        console.log(oldId, id);
        const products = yield select((state) => state.products.products);
        const originalProducts = products.slice();
        const indexOldId = originalProducts.findIndex(
          (item) => item.id === oldId
        );
        originalProducts.splice(indexOldId, 1);
        const indexId = originalProducts.findIndex((item) => item.id === id);
        if (indexId > -1) {
          return { err: "Product Id mag niet hetzelfde zijn." };
        }
        const { data } = yield call(
          instance.post,
          "/api/products/updateProduct",
          payload
        );
        yield put({
          type: "update",
          product: payload,
          oldId,
        });
        return data;
      } catch (e) {
        yield put({ type: "update/error", error: e.message, id });
      }
    },
    *deleteProduct({ payload }, { call, put }) {
      const { id } = payload;
      try {
        const { data } = yield call(
          instance.post,
          "/api/products/deleteProduct",
          payload
        );
        yield put({ type: "delete", id });

      } catch (e) {
        yield put({ type: "delete/error", error: e.message, id });
      }
    },
  },

  reducers: {
    "fetch/success"(state, { products }) {
      return {
        ...state,
        error: null,
        products,
      };
    },

    "fetch/error"(state, action) {
      return {
        error: action.error,
        products: [],
      };
    },
    add(state, { products }) {
      const copiedProducts = state.products.slice();
      copiedProducts.push(...products);
      copiedProducts.sort((a, b) => a.id - b.id);
      return {
        ...state,
        error: null,
        products: copiedProducts,
        succeedId: products[0].id,
      };
    },
    delete(state, { id }) {
      const copiedProducts = state.products.slice();
      const index = copiedProducts.findIndex(
        (copiedProduct) => copiedProduct.id === id
      );
      copiedProducts.splice(index, 1);
      return {
        ...state,
        error: null,
        products: copiedProducts,
        deleteSucceed:true
      };
    },
    update(state, { product, oldId }) {
      const originalProducts = state.products.slice();
      const index = originalProducts.findIndex(
        (originalProduct) => originalProduct.id === oldId
      );
      delete product["oldId"];
      originalProducts.splice(index, 1, product);
      originalProducts.sort((a, b) => a.id - b.id);
      return {
        ...state,
        error: null,
        products: originalProducts,
        updateSucceed:true

      };
    },
    cancel(state, { product, oldId }) {
      return {
        ...state,
        error: null,
        updateSucceed:false,
        deleteSucceed:false,
        succeedId:null

      };

    }
  },
};
