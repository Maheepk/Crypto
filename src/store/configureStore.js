import {createStore, combineReducers,applyMiddleware } from 'redux';
import dataReducer from '../reducers/dataReducer';

const rootReducer = combineReducers({data: dataReducer});
const configureStore = () => {
  return createStore(rootReducer);
};
export default configureStore;
