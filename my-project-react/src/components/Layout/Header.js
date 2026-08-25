import React from 'react';
import { 
  Phone, 
  Mail, 
  User, 
  Star, 
  Crosshair, 
  ShoppingCart, 
  Lock, 
  ChevronDown 
} from 'lucide-react';
import {useNavigate, Link} from 'react-router-dom';
// Import các icon mạng xã hội từ react-icons/fa (FontAwesome)
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaDribbble } from 'react-icons/fa';

const Header = () => {
  let kiemtra=localStorage.getItem('loginUser');
  let Navigate=useNavigate();
  function logout(e){
    e.preventDefault();
    if(kiemtra){
      localStorage.clear();
      Navigate('/login');
    }
  }
  function kiemtralogin(){
    if(kiemtra){
      return <li><Link onClick={logout}><Lock size={14} className="inline-block mr-1" /> Logout</Link></li>
    }
    else{
      return <li><Link to="/login"><Lock size={14} className="inline-block mr-1" /> Login</Link></li>
    }
  }

  return (
    <header id="header">
      {/* header_top */}
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills">
                  <li>
                    <a href="#phone">
                      <Phone size={14} className="inline-block mr-1" /> +2 95 01 88 821
                    </a>
                  </li>
                  <li>
                    <a href="#email">
                      <Mail size={14} className="inline-block mr-1" /> info@domain.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="social-icons pull-right">
                <ul className="nav navbar-nav">
                  <li><a href="#facebook"><FaFacebookF size={14} /></a></li>
                  <li><a href="#twitter"><FaTwitter size={14} /></a></li>
                  <li><a href="#linkedin"><FaLinkedinIn size={14} /></a></li>
                  <li><a href="#dribbble"><FaDribbble size={14} /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /header_top */}

      {/* header-middle */}
      <div className="header-middle">
        <div className="container">
          <div className="row">
            <div className="col-md-4 clearfix">
              <div className="logo pull-left">
                <a href="index.html">
                  <img src="images/home/logo.png" alt="Logo" />
                </a>
              </div>
              <div className="btn-group pull-right clearfix">
                <div className="btn-group">
                  <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                    USA <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#canada">Canada</a></li>
                    <li><a href="#uk">UK</a></li>
                  </ul>
                </div>

                <div className="btn-group">
                  <button type="button" className="btn btn-default dropdown-toggle usa" data-toggle="dropdown">
                    DOLLAR <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><a href="#ca-dollar">Canadian Dollar</a></li>
                    <li><a href="#pound">Pound</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-8 clearfix">
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                  <li><a href="#account"><User size={14} className="inline-block mr-1" /> Account</a></li>
                  <li><a href="#wishlist"><Star size={14} className="inline-block mr-1" /> Wishlist</a></li>
                  <li><a href="checkout.html"><Crosshair size={14} className="inline-block mr-1" /> Checkout</a></li>
                  <li><a href="cart.html"><ShoppingCart size={14} className="inline-block mr-1" /> Cart</a></li>
                  <li><a href="login.html"><Lock size={14} className="inline-block mr-1" /> Login</a></li>
                  {kiemtralogin()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /header-middle */}

      {/* header-bottom */}
      <div className="header-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li><a href="index.html">Home</a></li>
                  <li className="dropdown">
                    <a href="#shop">Shop <ChevronDown size={14} className="inline-block" /></a>
                    <ul role="menu" className="sub-menu">
                      <li><a href="shop.html">Products</a></li>
                      <li><a href="product-details.html">Product Details</a></li> 
                      <li><a href="checkout.html">Checkout</a></li> 
                      <li><a href="cart.html">Cart</a></li> 
                      <li><a href="login.html">Login</a></li> 
                    </ul>
                  </li> 
                  <li className="dropdown">
                    <a href="#blog" className="active">Blog <ChevronDown size={14} className="inline-block" /></a>
                    <ul role="menu" className="sub-menu">
                      <li><a href="blog.html" className="active">Blog List</a></li>
                      <li><a href="blog-single.html">Blog Single</a></li>
                    </ul>
                  </li> 
                  <li><a href="404.html">404</a></li>
                  <li><a href="contact-us.html">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="search_box pull-right">
                <input type="text" placeholder="Search"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /header-bottom */}
    </header>
  );
};

export default Header;