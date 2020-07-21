import axios from 'axios';
const {target} =require('../utils/gegevens')
import {routerRedux} from 'dva/router'


export default{

  namespace: 'login',

  state: {},

  subscriptions: {
    // setup({ dispatch, history }) {  // eslint-disable-line
    // },
  },

  effects: {
    *login({payload},{call,put}){
     try{
      const {data}= yield call(axios.post,`${target}/api/auth`,payload)
      const {token} =data
      localStorage.setItem('jwtToken', token)
       yield put(routerRedux.push('/admin'))
      }catch(e){
        console.log(e)
      }
    }


  },

  reducers: {
    'add' (state, action) {
      console.log(action)
      const {data} = action

        return{
          s:1
        }

  },
  },

};
