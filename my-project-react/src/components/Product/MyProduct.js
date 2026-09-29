import {useEffect,useState} from 'react';
import Api from '../Api/Api';
import {Link} from 'react-router-dom';

function MyProduct(){
  const [getProducts,setProducts]=useState({});

    useEffect(()=>{
      async function fetchData(){
        let userData=JSON.parse(localStorage.getItem("userData"));
        let accessToken=userData?.token;
        let config = {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Accept': 'application/json'
                    }
                };
        try{
          let res = await Api.get('/api/user/my-product', config);
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
      if(Object.values(getProducts)&&Object.values(getProducts).length>0){
        return Object.values(getProducts).map((product,index)=>{
          let LoadAnh="";
          try{
            if(product.image){
              let imageArr=typeof product.image==='string'
              ?JSON.parse(product.image):product.image;
              if(Array.isArray(imageArr)&&imageArr.length>0){
                LoadAnh = imageArr[imageArr.length - 1];
              }
              console.log("Danh sach anh:", product.image);
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
                <Link to={`/account/editproduct/${product.id}`}>edit</Link>
                <Link to={`/account/DeleteProduct/${product.id}`}>Delete</Link>
                <button className="btn btn-danger">Delete</button>
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