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
            <Route path="/Comment" element={<Comment/>}/>
          </Routes>
       </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
