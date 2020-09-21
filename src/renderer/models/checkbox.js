import axios from 'axios'
const target = localStorage.getItem('target');

export default {

  namespace: 'checkbox',

  state: [],

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen((props) => {
        if (props.pathname==="/"||props.pathname.includes("/admin")) {
           dispatch({type:'fetch'})
        }

        })
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      try {
        const {data} = yield call(axios.get, `${target}/api/admincrud/getcheckbox`);
        yield put({ type: "fetch/success", checkbox: data });
      } catch(e) {
         yield put({ type: "fetch/error", error: e.message });
      }
    },
  },

  reducers: {
    'fetch/success'(state, action) {
      return action.checkbox;
    },
    'fetch/error'(state,action){
      return [{error:action.error}]
    }
  },

};
