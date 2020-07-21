import axios from 'axios'
const {target} =require('../utils/gegevens')

export default {

  namespace: 'bezorgstatus',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen((props) => {
        if (props.pathname==="/"||props.pathname.includes("/checkout")||props.pathname.includes("/admin")) {
           dispatch({type:'fetch'})
        }

        })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const {data} = yield call(axios.get, `${target}/api/bezorgstatus`);
        yield put({ type: "fetch/success", bezorgstatus: data });
      } catch(e) {
         yield put({ type: "fetch/error", error: e.message });
      }
    },
  },

  reducers: {
    'fetch/success'(state, action) {
      return {
        status:action.bezorgstatus,
        error:null
      };
    },
    'fetch/error'(state,action){
      return {
        status:'unknown',
        error:action.error}
    }
  },

};
