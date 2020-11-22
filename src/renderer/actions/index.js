import { createAction } from 'redux-actions';

//cart
export const itemAdd = createAction('cart/add');
export const itemDelete = createAction('cart/delete');

export const goCheckout = createAction('cart/ready_to_pay');
export const logIn = createAction('login/login');
export const cancelProductModal = createAction('products/cancel');
export const updateInDb = createAction('products/updateProduct');
export const addInDb = createAction('products/addProduct');
export const deleteInDb = createAction('products/deleteProduct');
export const fetchBasketOrder = createAction('basket/fetch');
export const ordersFetch = createAction('admincrud/ordersFetch');
export const printOrder = createAction('admincrud/printOrder');
export const smsSend = createAction('admincrud/sms_send');
export const getOptions = createAction('admincrud/getOptions');
export const updateOptions = createAction('admincrud/updateOptions');
export const chooseBezorgGebied = createAction('basicinfo/bezorggebied/choose');
export const fetchBezorggebied = createAction('factors/fetchbezorggebied');
export const fetchCategories = createAction('categories/fetch');
export const addCategorie = createAction('categories/addCategorie');
export const updateCategorie = createAction('categories/updateCategorie');
export const deleteCategorie = createAction('categories/deleteCategorie');
export const fetchBasicinfo = createAction('categories/fetch');
export const updateCheckbox = createAction('checkbox/updateCheckbox');
export const addGroup = createAction('options/addGroup');
export const updateGroup = createAction('options/updateGroup');
export const deleteGroup = createAction('options/deleteGroup');
export const updateGroupOption = createAction('options/updateGroupOption');
export const addGroupOption = createAction('options/addGroupOption');
export const deleteGroupOption = createAction('options/deleteGroupOption');
export const updateKvknr = createAction('overige/updateKvknr');
export const updateLiveKey = createAction('overige/updateLiveKey');
export const updateFacebookUrl = createAction('overige/updateFacebookUrl');
export const updateEmailLogoUrl = createAction('overige/updateEmailLogoUrl');
export const updateText_1 = createAction('overige/updateText_1');
export const updateText_2 = createAction('overige/updateText_2');
export const updateBezorgstatus = createAction('overige/updateBezorgstatus');
export const updatePaybycash = createAction('overige/updatePaybycash');
export const addBezorggebied = createAction('overige/addBezorggebied');
export const updateBezorggebied = createAction('overige/updateBezorggebied');
export const deleteBezorggebied = createAction('overige/deleteBezorggebied');
export const addOpeningstijden = createAction('overige/addOpeningstijden');
export const updateOpeningstijden = createAction(
  'overige/updateOpeningstijden',
);
export const deleteOpeningstijden = createAction(
  'overige/deleteOpeningstijden',
);
export const updateBezorgtijden = createAction('overige/updateBezorgtijden');
export const updateCloseday = createAction('overige/updateCloseday');
export const updatePrintMethod = createAction('overige/updatePrintMethod');
export const listenOrder = createAction('admincrud/listenOrder');
export const updateBackgroundImages = createAction(
  'overige/updateBackgroundImages',
);
export const addCarouselImage = createAction('overige/addCarouselImage');
export const updateCarouselImage = createAction('overige/updateCarouselImage');
export const deleteCarouselImage = createAction('overige/deleteCarouselImage');
export const addMenulijst = createAction('overige/addMenulijst');
export const updateMenulijst = createAction('overige/updateMenulijst');
export const deleteMenulijst = createAction('overige/deleteMenulijst');
