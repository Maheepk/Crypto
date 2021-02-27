import {REMOVE_ITEM,ADD_CURRENCY,ADD_DATA,RESTORE_DATA,TASK_BEGIN, CLEAR_DATA} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  currencyData:[],
  availableCurrency:[],
  isLoading:true,
  updateDate: '',
  endDate: ''
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
     {
      var arrayData = [...state.currencyData];
      var arrayCurrency = [...state.availableCurrency];

      arrayData.splice(action.payload, 1);

      arrayCurrency.splice(action.payload, 1);
      let newState={
        ...state,
        currencyData: arrayData,
        availableCurrency:arrayCurrency
      };
      AsyncStorage.setItem("data",JSON.stringify(newState));
        return newState;
     }
      case ADD_CURRENCY:
        var endDate = new Date();
        endDate.setHours(23,59,59,999);
        console.log("Saved End date in system");
        console.log(endDate);
        let newState = {
          ...state,
          currencyData:[
            ...state.currencyData,
            action.payload.currencyData,
          ],
          availableCurrency:[
            ...state.availableCurrency,
            action.payload.currency,
          ],
          updateDate: (new Date().toString()),
          endDate:  (endDate.toString())
        };
        AsyncStorage.setItem("data",JSON.stringify(newState));
        return newState;
      case RESTORE_DATA:
        return{
          currencyData:action.payload.currencyData,
          availableCurrency:action.payload.availableCurrency,
          isLoading:false,
          updateDate: action.payload.updateDate,
          endDate: action.payload.endDate
        }
      case CLEAR_DATA:
        return initialState;
        
    default:
      return state;
  }
};
export default dataReducer;
