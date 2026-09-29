import {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import Api from '../Api/Api';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function ProductDetail(){
    let {id}=useParams();
    let navigate=useNavigate();
    const [getProduct,setProduct]=useState({});
    const [getSoLuongCart,setSoLuongCart]=useState(
        JSON.parse(localStorage.getItem('cart'))||{}
    )

    useEffect(()=>{
        async function fetchProduct(){
            let userData=JSON.parse(localStorage.getItem('userData'));
            let accesstoken=userData.token;
            if(!accesstoken){
                console.log("Chua dang nhap");
                navigate('/login');
            }
            try{
                let res=await Api.get(`/api/product/detail/${id}`);
                console.log(res.data);
                if(res.data.response){
                    setProduct(res.data.data);
                }
            }
            catch(e){
                console.log("Da xay ra loi khi get ProductDetail",e);
            }
        }
        fetchProduct();
    },[])

        const responsive = {
        desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,   // 👉 hiển thị 3 hình cùng lúc
        slidesToSlide: 1
        }
    };

    const loadProduct=()=>{
        if(getProduct&&getSoLuongCart){
            return(
                    <div key={getProduct.id}>
                    <div className="col-sm-5">
                        <div className="view-product">
                        <img src={`images/product-details/${getProduct.id}.jpg`} alt="" />
                        <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                         <Carousel
                            responsive={responsive}
                            arrows={true}
                            infinite={true}
                            autoPlay={false}
                            showDots={false}
                            containerClass="carousel-container"
                            itemClass="carousel-item-padding-40-px"
                            >
                            <img src="images/product-details/similar1.jpg" alt="" />
                            <img src="images/product-details/similar1.jpg" alt="" />
                            <img src="images/product-details/similar1.jpg" alt="" />
                        </Carousel>
                        <a className="left item-control" href="#similar-product" data-slide="prev">
                            <i className="fa fa-angle-left" />
                        </a>
                        <a className="right item-control" href="#similar-product" data-slide="next">
                            <i className="fa fa-angle-right" />
                        </a>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                        <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                        <h2>{getProduct.name}</h2>
                        <p>Web ID: {getProduct.id}</p>
                        <img src="images/product-details/rating.png" alt="" />
                        <span>
                            <span>US $ {getProduct.price}</span>
                            <label>Quantity:</label>
                            <input type="text" value={getSoLuongCart[id]||1} onChange={(e)=>setSoLuongCart(e.target.value)}/>
                            <button type="button" className="btn btn-fefault cart">
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                            </button>
                        </span>
                        <p><b>Availability:</b> In Stock</p>
                        <p><b>Condition:</b> New</p>
                        <p><b>Brand:</b> E-SHOPPER</p>
                        <a href="#!"><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                        </div>
                    </div>
                    </div>
                )
        }
    }

    return(
        <>
        <div className="product-details">
          {loadProduct()}
        </div>
        <div className="category-tab shop-details-tab">
          <div className="col-sm-12">
            <ul className="nav nav-tabs">
              <li><a href="#details" data-toggle="tab">Details</a></li>
              <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
              <li><a href="#tag" data-toggle="tab">Tag</a></li>
              <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade" id="details">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="companyprofile">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="tag">
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery1.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery2.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery3.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="product-image-wrapper">
                  <div className="single-products">
                    <div className="productinfo text-center">
                      <img src="images/home/gallery4.jpg" alt="" />
                      <h2>$56</h2>
                      <p>Easy Polo Black Edition</p>
                      <button type="button" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade active in" id="reviews">
              <div className="col-sm-12">
                <ul>
                  <li><a href="#!"><i className="fa fa-user" />EUGEN</a></li>
                  <li><a href="#!"><i className="fa fa-clock-o" />12:41 PM</a></li>
                  <li><a href="#!"><i className="fa fa-calendar-o" />31 DEC 2014</a></li>
                </ul>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p><b>Write Your Review</b></p>
                <form action="#">
                  <span>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Email Address" />
                  </span>
                  <textarea name="review" defaultValue={""} />
                  <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                  <button type="button" className="btn btn-default pull-right">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}
export default ProductDetail;