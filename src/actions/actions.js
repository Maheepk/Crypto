import {REMOVE_ITEM,ADD_CURRENCY} from '../constants';
export function removeItem(index) {
  return {
    type: REMOVE_ITEM,
    payload: index,
  };
}
export function addCurrency(currency){
    return {
        type: ADD_CURRENCY,
        payload: currency
    }
}
