import {configureStore} from '@reduxjs/toolkit';
import CartReduxAction from './ReduxAction/CartReduxAction';
import CartReduxTookit from './ReduxTookit/CartReduxToolkit';

const store=configureStore({
    reducer: {
        counter: CartReduxTookit,
        cart: CartReduxAction,
    }
});
export default store;
