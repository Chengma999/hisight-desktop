import {createAction} from 'redux-actions';

export const logIn = createAction('login/login')
export const updateInDb = createAction('admincrud/update')
export const addInDb = createAction('admincrud/add')
export const deleteInDb = createAction('admincrud/delete')
export const ordersFetch = createAction('admincrud/ordersFetch')
export const orderPrint = createAction('admincrud/orderPrint')
export const smsSend = createAction('admincrud/sms_send')
export const chooseBezorgGebied = createAction('factors/fetchbezorggebied/choose')
export const fetchBezorggebied = createAction('factors/fetchbezorggebied')
export const fetchbasket = createAction('basket/fetch')
export const reservationsFetch = createAction('admincrud/reservationsFetch')
