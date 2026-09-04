import StarRatings from 'react-star-ratings';
import { useState,useEffect } from "react";
import Api from '../Api/Api';

function Rate(props){
    let {id,getRate}=props;
    const [rating, setRating] = useState(0)
    
    useEffect(()=>{
        if(getRate&&getRate.length>0){
            let tong=0;
            getRate.map((item)=>{
                tong+=item.rate;
            })
            let trungbinh=tong/getRate.length;
            setRating(trungbinh);
        }
    },[getRate]);

    async function changeRating( newRating, name ) {
        setRating(newRating)

        const userData=JSON.parse(localStorage.getItem("userData"));

        if(!userData){
            alert("Ban chua login");
            return;
        }
        let accessToken=userData
        const formData=new FormData();
        formData.append( "user_id", userData.Auth.id );
        formData.append( "blog_id", id );
        formData.append( "rate", newRating);

        try{
            let response = await Api.post(`/api/blog/rate/${id}`, formData,
                {
                headers: { 
                              'Authorization': 'Bearer ' + accessToken,
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Accept': 'application/json'
                          }
              });
            if(response.data.errors){
                console.log("Loi",response.data.errors);
            }
            else{
                console.log("Đánh giá thành công!");
            }
        }
        catch(error){
            console.log("Da xay ra loi khi danh gia sao",error);
        }
        // - xu ly logic
    }
       
    return (
        <>
        <StarRatings
        rating={rating}
        starRatedColor="blue"
        changeRating={changeRating}
        numberOfStars={6}
        name='rating'
        />
        </>
    );      
}
export default Rate;