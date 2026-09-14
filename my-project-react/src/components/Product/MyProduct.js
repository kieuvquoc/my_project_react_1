import {useEffect,useState} from 'react';
import Api from '../Api/Api';

function MyProduct(){
  const [getProducts,setProducts]=useState([]);

    useEffect(()=>{
      async function fetchData(){
        try{
          let res=await Api.get('/api/product')
          if(res.error){
            console.log("Da xay ra loi",res.error);
          }
          else{
            console.log("Lay du lieu thanh cong:",res.data.response);
            console.log(res.data.data);
            setProducts(res.data.data);
          }
        }
        catch(error){
          console.error("Co loi khi fetch:", error);
        }

      }
      fetchData();
    },[])

    const loadProducts=()=>{
      if(getProducts&&getProducts.length>0){
        return getProducts.map((product,index)=>{
          let LoadAnh="";
          try{
            if(product.image){
              let imageArr=JSON.parse(product.image);
              if(imageArr.length>0){
                LoadAnh=imageArr[0];
              }
            }
          }
          catch(e){
            console.log("Da xa ra loi khi load image",e);
          }
          return(
            <tr key={index}>
              <td className="cart_id">
                <p>{product.id}</p>
              </td>
              <td className="cart_product">
                <a href="!#"><img style={{ height: '200px', width: '200px'}} src={`http://127.0.0.1:8000/upload/product/${product.id_user}/${LoadAnh}`} alt="png" /></a>
              </td>
              <td className="cart_description">
                <h4><a href="!#">{product.name}</a></h4>
              </td>
              <td className="cart_price">
                <p>${product.price}</p>
              </td>
              <td className="cart_total">
                <a href="!#">edit</a>
                <a href="!#">delete</a>
              </td>
            </tr>
          )
    })
  }}

    return (

      <div className="table-responsive cart_info">
        <table className="table table-condensed">
          <thead>
            <tr className="cart_menu">
              <td className="id">id</td>
              <td className="image">image</td>
              <td className="description">description</td>
              <td className="price">price</td>
              <td className="total">action</td>
            </tr>
          </thead>
          <tbody>
              {loadProducts()}
          </tbody>
        </table>
      </div>
    );
}
export default MyProduct;