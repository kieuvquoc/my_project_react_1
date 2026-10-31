import {createStore, combineReducers} from 'redux';
import CartReduxAction from '../Redux/ReduxAction/CartReduxAction';

const rootReducer=combineReducers({
    cart: CartReduxAction
});

const store=createStore(rootReducer);
export default store;