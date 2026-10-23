import {createContext, useState, useContext, useEffect} from 'react';
    
    const CartContext=createContext();

    export function ContextProvider({children}){
        
        const [getItemCart,setItemCart]=useState(()=>{
            try{
                const cart=JSON.parse(localStorage.getItem("cart")); 
                return cart ? cart : []
            }
            catch(e) {
                console.log("Da xay ra loi khi lay data tu local");
                localStorage.removeItem("cart");
                return [];
            }
        });

        useEffect(()=>{
            try{
                localStorage.setItem("cart",JSON.stringify(getItemCart));
            }
            catch(e) {
                console.log("Da xay ra loi khi luu data len local");
            }
        },[getItemCart]);

        const themCart=(product)=>{
            setItemCart((state)=>{
                let kiemtra=state.findIndex((item)=>item.id===product.id);
                let updateList;
                if(kiemtra!== -1){
                    updateList=[...state];
                    updateList[kiemtra].qty+=1;
                    return updateList;
                }
                else {
                    updateList = [...state, {...product,qty:1}];
                }
                return updateList;
            })
        };

        const xoaCart=(id)=>{
            setItemCart((state)=>
                state.filter((item)=>item.id!=id)
            );
        };

        function tangCart(id){
            setItemCart((state)=>
                state.map((item)=>
                    item.id===id?({...item,qty:item.qty+1}):item
                )
            );
        }

        function giamCart(id){
            setItemCart((state)=>
                state.map((item)=>
                    item.id===id&&item.qty>1?({...item, qty:item.qty-1}):item
                )
            );
        }

        const tongCart=getItemCart.reduce((total,item)=>total+item.qty,0);

        return(
            <CartContext.Provider value={{getItemCart, setItemCart, themCart, xoaCart, tangCart, giamCart, tongCart}}>
                {children}
            </CartContext.Provider>
        )
    }

export const useCart = () => useContext(CartContext);