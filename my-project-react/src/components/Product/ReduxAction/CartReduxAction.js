const initialState = {
    cart: []
};

export default function CartReducer(state=initialState, action){
    switch (action.type) {
        case 'addCartReAc':{
            const newItem= action.payload;
            const CartTonTai=state.cart.findIndex(item=>item.id===newItem.id);
            if(CartTonTai>=0){
                const newList=[...state.cart];
                newList[CartTonTai]={
                    ...newList[CartTonTai],
                    qty: newList[CartTonTai].qty+1
                };
                return {
                    ...state,
                    cart:newList
                };
            }
            else {
                return {
                    ...state,
                    cart: [...state.cart, { ...newItem, qty: 1 }]
                };
            }
        }
        default:
            return state;
    }
}