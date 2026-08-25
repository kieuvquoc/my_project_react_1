import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function KiemTraLogin(){
    let kiemtra=localStorage.getItem('loginUser');
    let Navigate=useNavigate();

    useEffect(()=>{
        if(!kiemtra){
            Navigate("/login");
        }
    },[]);
}
export default KiemTraLogin;