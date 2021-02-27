import {REMOVE_ITEM,ADD_CURRENCY, CLEAR_DATA} from '../constants';
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
export function clearCurrency(){
  return {
      type: CLEAR_DATA,
  }
}
