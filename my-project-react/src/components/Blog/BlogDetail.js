import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import KiemTraLogin from '../Member/KiemTraLogin'
import Api from '../Api/Api'
import Comment from './Comment'
import ListComment from './ListComment'
import Rate from './Rate'

const BlogDetail=()=>{
  const [getData,setData]=useState({});
  const [getLoading,setLoading]=useState(true);
  const [getReply,setReply]=useState(0);
  const [getRate,setRate]=useState([]);

  let {id}=useParams();
  useEffect(()=>{
    async function LoadBlogDetail(){
      try{
        const [responseBlog, responseRate] = await Promise.all([
          Api.get(`/api/blog/detail/${id}`),
          Api.get(`/api/blog/rate/${id}`)
        ]);
        // let responseBlog = await Api.get(`/api/blog/detail/${id}`);
        // setData(responseBlog.data.data);

        // let responseRate = await Api.get(`/api/blog/rate/${id}`);
        // setRate(responseRate.data.data);
        setData(responseBlog.data.data);
        setRate(responseRate.data.data);
        console.log(responseBlog.data.data);
        console.log(responseRate.data.data);
      }
      catch(error){
        console.log("Da xay ra loi khi load blog chi tiet",error);
      }
      finally{
        setLoading(false);
      }
    }
    LoadBlogDetail();
  },[id])

  function xulyreply(comment_id){
      setReply(comment_id);
      document.getElementById('form-comment').scrollIntoView({ behavior: 'smooth' });    
  }

  function themCommentNew(newComment){
    setData(data=>({...data, comment:data.comment ? [...data.comment, newComment] : [newComment]}))
  }

  function renderData(){   
    if(getLoading){
      return <p>Dang tai du lieu...</p>
    }
    if(getData&&Object.keys(getData).length>0){
        return(
          <div className="single-blog-post" key={getData.id}>
                <h3>{getData.title}</h3>
                <div className="post-meta">
                  <ul>
                    <li><i className="fa fa-user" /> Van Quoc</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> MAY 26, 2026</li>
                  </ul>
                </div>
                <a href="#!">
                  <img src={`http://127.0.0.1:8000/upload/Blog/image/${getData.image}`} alt="" />
                </a>
                <p>{getData.content}</p> <br />
                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
        )
    }
    return <p>Chưa có bài viết nào.</p>;
  }
    return(
      <>{<KiemTraLogin/>}
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              {renderData()}
            </div>
            <div className="rating-area">
              <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                  <Rate id={id} getRate={getRate} />
                </li>
                <li className="color">(6 votes)</li>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href="#!">Pink <span>/</span></a></li>
                <li><a className="color" href="#!">T-Shirt <span>/</span></a></li>
                <li><a className="color" href="#!">Girls</a></li>
              </ul>
            </div>
            <div className="socials-share">
              <a href="#!"><img src="images/blog/socials.png" alt="" /></a>
            </div>{/*/socials-share*/}
            <div className="response-area">
              <h2>RESPONSES</h2>
              <ListComment comment={getData.comment} getReplyid={xulyreply}/>
            </div>{/*/Response-area*/}
            <Comment id={id} getReply={getReply} themComment={themCommentNew} />
          </div>
    </>
    )
}
export default BlogDetail