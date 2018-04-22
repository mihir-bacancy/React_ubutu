import {createStore} from 'redux';
import RootReducer  from './ReducerIndex';
const store = createStore(RootReducer);
export default store;