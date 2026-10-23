import {createContext,useState,useEffect,useContext} from 'react';

    const WishListContext=createContext();

    export function ContextWishList({children}){
        const [getItemWL,setItemWL]=useState(()=>{
            try{
                const wishlist=JSON.parse(localStorage.getItem('wishlist'));
                return wishlist?wishlist:[]
            }
            catch(e){
                console.log("Da xay ra loi khi lay data tu local");
                localStorage.removeItem('wishlist');
                return [];
            }
        });

        useEffect(()=>{
            try{
                localStorage.setItem("wishlist",JSON.stringify(getItemWL));
            }
            catch(e) {
                console.log("Da xay ra loi khi luu data len local");
            }
        },[getItemWL]);

        const clickWishList=(productId)=>{
            setItemWL((state)=>{
                if(state.includes(productId)){
                    return state.filter(id=>id!=productId);
                }
                else {
                    return [...state, productId];
                }
            })
        }

        const tongWishList=getItemWL.length;

        return (
            <WishListContext.Provider value={{getItemWL,setItemWL,clickWishList,tongWishList}}>
                {children}
            </WishListContext.Provider>
        )
    }

export const useWishList=()=>useContext(WishListContext);