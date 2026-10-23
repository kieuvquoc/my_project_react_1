import React, {useState,useEffect} from 'react';
import Api from '../Api/Api';
import { useNavigate} from 'react-router-dom';
import {useCart} from './ContextCart';

function Cart({product}){
    const navigate = useNavigate();

    const {getItemCart, setItemCart, xoaCart, tangCart, giamCart}=useCart();

      useEffect(()=>{
          async function updateCart(){
              try{
                  let userData=JSON.parse(localStorage.getItem("userData"))||{};
                  let ItemCart=JSON.parse(localStorage.getItem("cart"))||{};

                  if(!userData){
                      console.log("Ban khong co quyen truy cap");
                      navigate("/login");
                  }
                  let accessToken=userData.token;
                  let config={
                      headers: {
                          'Authorization': 'Bearer ' + accessToken,
                                  'Accept': 'application/json'
                      }
                  }
                  let res=await Api.post(`/api/product/cart`,ItemCart,config);

                  if(res.data&&res.data.data){
                      console.log(res.data);
                      setItemCart(res.data.data);
                  }
              } catch (error) {
                  console.error("Da xay ra loi khi post:", error);
              }
          }
          updateCart();
      },[])

    function buttonTang(e,id){
        e.preventDefault()

        tangCart(id);
    }

    function buttonGiam(e,id){
        e.preventDefault();

        giamCart(id);

    }

    function buttonXoa(e,id){
        e.preventDefault();

        xoaCart(id);
        alert("Da xoa san pham khoi gio hang");
    }


    return(
        <div>
        <section id="cart_items">
          <div className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><a href="/home">Home</a></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  {Object.values(getItemCart).length === 0 ? (
                    <tr>
                      <td>
                        <h4>Giỏ hàng của bạn đang trống</h4>
                      </td>
                    </tr>
                  ) : (
                    Object.values(getItemCart).map((item, index) => (
                      <tr key={index}>
                        <td className="cart_product">
                          <a href="#!">
                            <img 
                              src={`http://127.0.0.1:8000/upload/product/${item.id_user}/${item.image[0]}`} 
                              alt="" 
                              style={{width: "80px", height: "80px", objectFit: "cover"}} 
                            />
                          </a>
                        </td>
                        <td className="cart_description">
                          <h4><a href="#!">{item.name}</a></h4>
                          <p>Web ID: {item.id}</p>
                        </td>
                        <td className="cart_price">
                          <p>$ {item.price}</p>
                        </td>
                        <td className="cart_quantity">
                          <div className="cart_quantity_button">
                            <a onClick={(e) => buttonTang(e, item.id)} className="cart_quantity_up"> + </a>
                            <input 
                              className="cart_quantity_input" 
                              type="text" 
                              name="quantity" 
                              value={item.qty} 
                              readOnly 
                              size={2} 
                            />
                            <a onClick={(e) => buttonGiam(e, item.id)} className="cart_quantity_down"> - </a>
                          </div>
                        </td>
                        <td className="cart_total">
                          <p className="cart_total_price">$ {item.price * item.qty}</p>
                        </td>
                        <td className="cart_delete">
                          <a onClick={(e) => buttonXoa(e, item.id)} className="cart_quantity_delete">
                            <i className="fa fa-times" />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update">Get Quotes</a>
                  <a className="btn btn-default check_out">Continue</a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li>Cart Sub Total <span>$59</span></li>
                    <li>Eco Tax <span>$2</span></li>
                    <li>Shipping Cost <span>Free</span></li>
                    <li>Total <span>$61</span></li>
                  </ul>
                  <a className="btn btn-default update">Update</a>
                  <a className="btn btn-default check_out">Check Out</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}
export default Cart;