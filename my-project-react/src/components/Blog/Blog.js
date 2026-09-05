import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Api from '../Api/Api';
import KiemTraLogin from '../Member/KiemTraLogin';

function Blog(){
    const [getData,setData]=useState([])
    const [getLoading,setLoading]=useState(true)


    useEffect(()=>{
      async function LoadBlog(){
        try{
          let response=await Api.get("/api/blog/")
          setData(response.data.blog.data)
        }
        catch(error){
          console.log("Da xay ra loi khi lay du lieu",error)
        }
        finally{
          setLoading(false)
        }
      }
      LoadBlog();
    },[])

     async function chuyenTrang(e,numberpage){
      e.preventDefault();
      setLoading(true);
      try{
        let response=await Api.get(`/api/blog?page=${numberpage}`)
        setData(response.data.blog.data)
      }
      catch(error){
        console.log("Da xay ra loi khi chuyen trang",error);
      }
      finally{
        setLoading(false)
      }
     }

    const renderData=()=>{
      if(getLoading){
        return <p>Dang tai...</p>
      }
      
      if(getData.length>0){
        return getData.map((item,index)=>{
        return(
          <div className="single-blog-post" key={item.id}>
                <h3>{item.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Van Quoc</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> MAY 26, 2026</li>
                  </ul>
                  <span>
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-half-o" />
                  </span>
                </div>
                <a href="#!">
                  <img src={(`http://127.0.0.1:8000/upload/Blog/image/${item.image}`)} alt="" />
                </a>
                <p>{item.description}</p>
                <Link to={"/blog/detail/"+item.id}>Read More</Link>
              </div>
        )
      })
      }
    }

    return(
      <>
        {<KiemTraLogin/>}
        <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              {renderData()}
              <div className="pagination-area">
                <ul className="pagination">
                  <li><a href="#" onClick={(e)=>chuyenTrang(e,1)}>1</a></li>
                  <li><a href="#" onClick={(e)=>chuyenTrang(e,2)}>2</a></li>
                  <li><a href="#" onClick={(e)=>chuyenTrang(e,3)}>3</a></li>
                  <li><a href="#" onClick={(e)=>chuyenTrang(e,4)}><i className="fa fa-angle-double-right" /></a></li>
                </ul>
              </div>
            </div>
          </div>
    </>
    )
}
export default Blog