import {useState,useEffect} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import Api from '../Api/Api';
import { useCart } from './ContextCart';
import { useWishList } from './ContextWishList';


function WishList(){
    const navigate=useNavigate();
    const { themCart } = useCart();
    const {getItemWL,clickWishList}= useWishList();

    const [getProduct,setProduct]=useState([]);

    useEffect(()=>{
      async function fetchWishList() {
        try{
            let userData=localStorage.getItem("userData")?
            JSON.parse(localStorage.getItem("userData")):JSON.parse(localStorage.getItem("loginUser"));

            if(!userData){
              console.log("Ban kh co quyen truy cao");
              navigate("/login");
              return;
            }

            let res = await Api.get(`/api/product/wishlist`);
            if(res.data&&res.data.data){
                  console.log(res.data);
                  setProduct(res.data.data);
            }
          }
        catch(e){
          console.log("Da xa ra roi khi get wishlist");
        }
      }
      fetchWishList();
    },[getItemWL]);

    const handleAddToCart = (e, product) => {
        e.preventDefault();
        themCart(product);
        alert("Đã thêm sản phẩm vào giỏ hàng!");
        navigate("/cart");
    };

    function xoaYeuThich(e,id){
      e.preventDefault();
      
      clickWishList(id);
      alert("Đã xoa sản phẩm khoi muc yeu thich");
    }

    const LocProductYeuThich=getProduct.filter(product => getItemWL.includes(product.id));

     function taiWishList(){
        if(!LocProductYeuThich || LocProductYeuThich.length === 0) {
            return <p className="text-center">Danh sach yeu thich trong</p>;
        }

      return LocProductYeuThich.map((product,index)=>{
        let firstImage = "";
        try {
            if (product.image) {
            let imageArr = typeof product.image === 'string'
                ? JSON.parse(product.image)
                : product.image;
            if (Array.isArray(imageArr) && imageArr.length > 0) {
                firstImage = imageArr[0];
            }
            }
        } catch (e) {
            console.error("Lỗi dinh dang anh:", e);
        }

        return(
          <div className="col-sm-4" key={product.id || index}>
                <div className="product-image-wrapper" key={product.id || index}>
                    <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={`http://127.0.0.1:8000/upload/product/${product.id_user}/${firstImage}`} alt={product.name}
                        style={{ height: '250px', objectFit: 'cover' }}/>
                        <h2>${product.price}</h2>
                        <p>{product.name}</p>
                        <button onClick={(e) => handleAddToCart(e, product)} className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart" /> Add to cart
                        </button>
                    </div>

                    <div className="product-overlay">
                        <div className="overlay-content">
                        <h2>${product.price}</h2>
                        <p>{product.name}</p>
                        <button  onClick={(e) => handleAddToCart(e, product)}
                            className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" /> Add to cart
                        </button>
                        <Link to={`/product/detail/${product.id}`} className="btn btn-default add-to-cart"
                            style={{ marginTop: '10px' }}><i className="fa fa-info-circle" /> More
                        </Link>
                        </div>
                    </div>
                    </div>

                    <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li>
                            <a href="#" onClick={(e) => xoaYeuThich(e, product.id)}><i class="fa fa-plus-square"></i>Delete wishlist</a>
                        </li>
                        <li>
                        <a href="#!"><i className="fa fa-plus-square" /> Add to compare</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        )
     })
    }

    return(
        <div className="features_items">
            <h2 className="title text-center">My Wishlist</h2>
            {taiWishList()}
        </div>
    );
}
export default WishList;