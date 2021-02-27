import {REMOVE_ITEM,ADD_CURRENCY,ADD_DATA,RESTORE_DATA,TASK_BEGIN} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  currencyData:[],
  availableCurrency:[],
  isLoading:true,
}
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      var array = [...state.currencyData];
      array.splice(action.payload, 1);
        return {
        ...state,
        currencyData: array,
      };
      case ADD_CURRENCY:
        let newState = {
          ...state,
          currencyData:[
            ...state.currencyData,
            action.payload.currencyData,
          ],
          availableCurrency:[
            ...state.availableCurrency,
            action.payload.currency,

          ]
        };
        AsyncStorage.setItem("data",JSON.stringify(newState));
        return newState;
      case RESTORE_DATA:
        return{
          currencyData:action.payload.currencyData,
          availableCurrency:action.payload.availableCurrency,
          isLoading:false,
        }

    default:
      return state;
  }
};
export default dataReducer;
