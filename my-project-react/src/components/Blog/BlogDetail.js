import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const BlogDetail=()=>{
  const [getData,setData]=useState([]);
  const [getLoading,setLoading]=useState(true);

  let {id}=useParams();
  useEffect(()=>{
    async function LoadBlogDetail(id){
      try{
        let response=await axios.get(`http://127.0.0.1:8000/api/blog/detail/${id}`)
        setData(response.data.blog.data)
      }
      catch(error){
        console.log("Da xay ra loi khi load blog chi tiet");
      }
      finally{
        setLoading(false);
      }
    }
    LoadBlogDetail();
  },[id])

  function renderData(){   
    if(getLoading){
      return <p>Dang tai du lieu...</p>
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
                </div>
                <a href>
                  <img src="images/blog/blog-one.jpg" alt="" />
                </a>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p> <br />
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> <br />
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p> <br />
                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                </p>
                <div className="pager-area">
                  <ul className="pager pull-right">
                    <li><a href="#">Pre</a></li>
                    <li><a href="#">Next</a></li>
                  </ul>
                </div>
              </div>
        )
      })
    }
    return <p>Chưa có bài viết nào.</p>;
  }
    return(
          <div className="col-sm-9">
            <div className="blog-post-area">
              <h2 className="title text-center">Latest From our Blog</h2>
              {renderData()}
            </div>
            <div className="rating-area">
              <ul className="ratings">
                <li className="rate-this">Rate this item:</li>
                <li>
                  <i className="fa fa-star color" />
                  <i className="fa fa-star color" />
                  <i className="fa fa-star color" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                </li>
                <li className="color">(6 votes)</li>
              </ul>
              <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href>Pink <span>/</span></a></li>
                <li><a className="color" href>T-Shirt <span>/</span></a></li>
                <li><a className="color" href>Girls</a></li>
              </ul>
            </div>
            <div className="socials-share">
              <a href><img src="images/blog/socials.png" alt="" /></a>
            </div>{/*/socials-share*/}
            {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}{/*Comments*/}
            <div className="response-area">
              <h2>3 RESPONSES</h2>
              <ul className="media-list">
                <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-two.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-four.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
                <li className="media second-media">
                  <a className="pull-left" href="#">
                    <img className="media-object" src="images/blog/man-three.jpg" alt="" />
                  </a>
                  <div className="media-body">
                    <ul className="sinlge-post-meta">
                      <li><i className="fa fa-user" />Janis Gallagher</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <a className="btn btn-primary" href="#"><i className="fa fa-reply" />Replay</a>
                  </div>
                </li>
              </ul>					
            </div>{/*/Response-area*/}
            <div className="replay-box">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div className="text-area">
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea name="message" rows={11} defaultValue={""} />
                    <a className="btn btn-primary" href="#">post comment</a>
                  </div>
                </div>
              </div>
            </div>{/*/Repaly Box*/}
          </div>
    )
}
export default BlogDetail