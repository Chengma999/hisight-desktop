import axios from "axios";
const target = localStorage.getItem('target');
import {instance} from '../utils/gegevens'
const restaurant_id = localStorage.getItem('restaurant_id');

export default {
  namespace: "overige",

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
    },
  },

  effects: {
    *updateKvknr({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateKvknr/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/kvknr/updateKvknr",
          kvknr: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateLiveKey({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateLiveKey/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/liveKey/updateLiveKey",
          liveKey: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateFacebookUrl({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateFacebookUrl/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/facebookUrl/updateFacebookUrl",
          facebookUrl: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateEmailLogoUrl({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateEmailLogoUrl/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/emailLogoUrl/updateEmailLogoUrl",
          emailLogoUrl: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateText_1({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateText_1/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/text_1/updateText_1",
          text_1: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateText_2({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateText_2/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/text_2/updateText_2",
          text_2: data,
        });
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBezorgstatus({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateBezorgstatus/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorgstatus/updateBezorgstatus",
          bezorgstatus: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updatePaybycash({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updatePaybycash/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/paybycash/updatePaybycash",
          paybycash: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBezorgtijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateBezorgtijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorgtijden/updateBezorgtijden",
          bezorgtijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateCloseday({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateCloseday/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/closeday/updateCloseday",
          closeday: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addBezorggebied({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/addBezorggebied/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorggebied/updateBezorggebied",
          bezorggebied: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateBezorggebied({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateBezorggebied/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorggebied/updateBezorggebied",
          bezorggebied: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteBezorggebied({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/deleteBezorggebied/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/bezorggebied/updateBezorggebied",
          bezorggebied: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *addOpeningstijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/addOpeningstijden/${restaurant_id}`,
          payload
        );
        console.log(data);
        yield put({
          type: "basicinfo/openingstijden/updateOpeningstijden",
          openingstijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *updateOpeningstijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/updateOpeningstijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/openingstijden/updateOpeningstijden",
          openingstijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    *deleteOpeningstijden({ payload }, { call, put, select }) {
      try {
        const { data } = yield call(
          instance.post,
          `/api/overige/deleteOpeningstijden/${restaurant_id}`,
          payload
        );
        yield put({
          type: "basicinfo/openingstijden/updateOpeningstijden",
          openingstijden: data,
        });
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  },

  reducers: {
    save(state, action) {
      const { afhaaltext } = action;
      return { ...state, afhaaltext };
    },
  },
};
