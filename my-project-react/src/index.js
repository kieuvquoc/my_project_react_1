import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import Blog from './components/Blog/Blog';
import BlogDetail from './components/Blog/BlogDetail';
import Register from './components/Member/Register';
import Login from './components/Member/Login';
import Comment from './components/Blog/Comment';
import Update from './components/Member/Update';
import MyProduct from './components/Product/MyProduct';
import AddProduct from './components/Product/AddProduct';
import EditProduct from './components/Product/EditProduct';
import DeleteProduct from './components/Product/DeleteProduct';
import Home from './components/Member/Home';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
       <App>
          <Routes>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/blog/detail/:id" element={<BlogDetail/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/comment" element={<Comment/>}/>
            <Route path="/account/update" element={<Update/>}/>
            <Route path="/account/myproduct" element={<MyProduct/>}/>
            <Route path="/account/addproduct" element={<AddProduct/>}/>
            <Route path="/account/editproduct/:id" element={<EditProduct/>}/>
            <Route path="/account/DeleteProduct/:id" element={<DeleteProduct/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/product/detail/:id" element={<ProductDetail/>}/>
            <Route path="/cart" element={<Cart/>}/>

          </Routes>
       </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
