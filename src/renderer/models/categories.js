import axios from 'axios'
const {target} =require('../utils/gegevens')

export default {

  namespace: 'categories',

  state: {},

  subscriptions: {


  setupHistory({dispatch,history}){
    history.listen(({pathname}) => {

      if (pathname==="/"||pathname==="/admin/products"){
         dispatch({type:'fetch'})
      }

      })
    }
  },
  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      // yield put({ type: 'fetch/start' });
      try {
        const {data} = yield call(axios.get, `${target}/api/categories`);
        yield put({ type: "fetch/success", categories: data });
      } catch(e) {
         yield put({ type: "fetch/error", error: e.message });
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

    'fetch/success' (state, action) {
      return {
        error: null,
        categories: action.categories
      }
    },

    'fetch/error' (state, action) {
      return {
        error: action.error,
        categories: null
      }
    }
  },

};
