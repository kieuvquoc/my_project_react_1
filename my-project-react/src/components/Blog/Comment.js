import Api from '../Api/Api';
import {useState} from 'react';

function Comment(props){
    let {id,getReply,themComment}=props;
    const [getMess,setMess]=useState("");

      function NhapMess(e){
        setMess(e.target.value);
      }

      async function UpMess(e){
        e.preventDefault();

        const userData=JSON.parse(localStorage.getItem("userData"));

        if(!userData){
          alert("Ban chua login");
          return;
        }

        if(!getMess){
          alert("Ban chua nhap noi dung comment");
        }
        else{
          let accessToken=userData.token;
          const formData=new FormData();
          formData.append('id_blog',id);
          formData.append('id_user',userData.Auth.id);
          formData.append('name_user',userData.Auth.name);
          formData.append('id_comment',getReply?getReply:0);
          formData.append('comment',getMess);
          formData.append('image_user',userData.Auth.avatar);

          try{
            let response = await Api.post(`/api/blog/comment/${id}`, formData,
              {
                headers: { 
                              'Authorization': 'Bearer ' + accessToken,
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Accept': 'application/json'
                          }
              });
            if(response.data.errors){
              console.log(response.data.errors);
            }
            else {
              themComment(response.data.data);
              setMess("");
            }
          }
          catch(error){
            console.log("Da xay ra loi khi post", error);
          }
        }
      }


    return (
            <div className="replay-box">
              <div className="row">
                <div className="col-sm-12">
                  <h2>Leave a replay</h2>
                  <div className="text-area">
                    <div className="blank-arrow">
                      <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <textarea id="form-comment" value={getMess} name="message" onChange={NhapMess} rows={11} />
                    <a onClick={UpMess} className="btn btn-primary" href="#">post comment</a>
                  </div>
                </div>
              </div>
            </div>
    )
}
export default Comment;