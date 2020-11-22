import { instance } from '../utils/gegevens';
const restaurant_id = localStorage.getItem('restaurant_id');

export default {
  namespace: 'basicinfo',

  state: {
    restaurantName: null,
    namespace: null,
    target: null,
    kvknr: null,
    text_1: null,
    text_2: null,
    resAddress: null,
    resPostcode: null,
    resTelnr: null,
    resMail: null,
    options: [],
    categories: [],
    checkbox: [],
    bezorgstatus: false,
    paybycash: false,
    closeday: [],
    bezorgtijden: { begin: null, end: null },
    bezorggebied: [],
    openingstijden: [],
    liveKey: null,
    facebookUrl: null,
    emailLogoUrl: null,
    bezorgchosen: null,
    printMethod: { printWithoutSoftware: false, targetIp: null },
    carouselImages: [],
    backgroundImages: { top: null, middle: null, bottom: null },
    menulijsts: [],
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      const { pathname } = history.location;

      history.listen((props) => {
        if (
          props.pathname === '/' ||
          props.pathname === '/online_bestellen' ||
          props.pathname === '/admin/orders' ||
          props.pathname === '/admin/products' ||
          props.pathname === '/admin/overige' ||
          props.pathname === '/privacy' ||
          props.pathname === '/menulijst' ||
          pathname.includes("/redirect") ||
          pathname.includes('/checkout')
        ) {
          dispatch({ type: 'fetch' });
        }
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put, select }) {
      try {
        const basicinfo = yield select((state) => state.basicinfo);
        if (!basicinfo.restaurantName) {
          const { data } = yield call(
            instance.get,
            `/api/basicinfo/${restaurant_id}`,
          );
          yield put({ type: 'save', basicinfo: data });
          return data;
        }
        return;
      } catch (err) {
        yield put({ type: 'fetch/error', error: err.message });
        console.log(err);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.basicinfo };
    },
    'categories/updateCategorie'(state, { categories }) {
      return { ...state, categories };
    },
    'checkbox/updateCheckbox'(state, { checkbox }) {
      return { ...state, checkbox };
    },
    'options/success'(state, { options }) {
      return { ...state, options: [...options] };
    },
    'kvknr/updateKvknr'(state, { kvknr }) {
      return { ...state, kvknr };
    },
    'liveKey/updateLiveKey'(state, { liveKey }) {
      return { ...state, liveKey };
    },
    'facebookUrl/updateFacebookUrl'(state, { facebookUrl }) {
      return { ...state, facebookUrl };
    },
    'emailLogoUrl/updateEmailLogoUrl'(state, { emailLogoUrl }) {
      return { ...state, emailLogoUrl };
    },
    'text_1/updateText_1'(state, { text_1 }) {
      return { ...state, text_1 };
    },
    'text_2/updateText_2'(state, { text_2 }) {
      return { ...state, text_2 };
    },
    'bezorgstatus/updateBezorgstatus'(state, { bezorgstatus }) {
      return { ...state, bezorgstatus };
    },
    'paybycash/updatePaybycash'(state, { paybycash }) {
      return { ...state, paybycash };
    },
    'bezorggebied/updateBezorggebied'(state, { bezorggebied }) {
      return { ...state, bezorggebied: [...bezorggebied] };
    },
    'bezorggebied/choose'(state, { payload }) {
      const { bezorgchosen } = payload;
      return {
        ...state,
        bezorgchosen,
      };
    },
    'openingstijden/updateOpeningstijden'(state, { openingstijden }) {
      return { ...state, openingstijden: [...openingstijden] };
    },
    'bezorgtijden/updateBezorgtijden'(state, { bezorgtijden }) {
      return { ...state, bezorgtijden: { ...bezorgtijden } };
    },
    'closeday/updateCloseday'(state, { closeday }) {
      return { ...state, closeday: [...closeday] };
    },
    'backgroundImages/updateBackgroundImages'(state, { backgroundImages }) {
      return { ...state, backgroundImages: { ...backgroundImages } };
    },
    'carouselImages/updateCarouselImage'(state, { carouselImages }) {
      return { ...state, carouselImages: [...carouselImages] };
    },
    'printMethod/updatePrintMehod'(state, { printMethod }) {
      return { ...state, printMethod: { ...printMethod } };
    },
    'menulijsts/updateMenulijst'(state, { menulijsts }) {
      return { ...state, menulijsts: [...menulijsts] };
    },
  },
};
