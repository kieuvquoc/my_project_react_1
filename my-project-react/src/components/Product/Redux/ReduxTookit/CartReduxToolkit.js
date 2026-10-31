import {createSlice} from '@reduxjs/toolkit';
const Slice = createSlice({
    name: 'counter',

    initialState: {
        cart: []
    },

    reducers: {
        addCartTookit(state,action){
            const newItem=action.payload;
            const MangCart=Array.isArray(state.cart)? state.cart: [];
            const CartTonTai=MangCart.findIndex(item=>item.id===newItem.id);
            if(CartTonTai>=0){
                const newList=[...MangCart];
                newList[CartTonTai]={
                    ...newList[CartTonTai],
                    qty: newList[CartTonTai].qty+1
                };
                return {
                    ...state,
                    cart:newList
                }
            }
            else{
                return {
                    ...state,
                    cart: [...MangCart, {...newItem, qty:1}]
                };
            }
        }
    }
});
export const {addCartTookit} = Slice.actions;
export default Slice.reducer;