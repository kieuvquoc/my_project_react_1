import {useState} from 'react';
import Api from '../Api/Api'

function ListComment(props){
    let {comment,getReplyid}=props;

    const renderComment=()=>{
        if(comment&&Object.keys(comment).length>0){
            return Object.values(comment).map((item, index) => {
                if(item.id_comment==0){
                    return(
                        <ul className="media-list" key={index}>
                            <li className="media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={(`http://127.0.0.1:8000/upload/Blog/image/${item.image_user}`)} alt="avatar" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{item.name_user}</li>
                                    </ul>
                                    <p>{item.comment}</p>
                                    <button onClick={()=>getReplyid(item.id)} className="btn btn-primary"><i className="fa fa-reply" />Replay</button>
                                </div>
                            </li>
                            {Object.values(comment).map((itemCon,indexCon)=>{
                                if(itemCon.id_comment==item.id){
                                    return(
                                        <li className="media second-media" key={indexCon}>
                                            <a className="pull-left" href="#">
                                            <img className="media-object" src={(`http://127.0.0.1:8000/upload/Blog/image/${itemCon.image_user}`)} alt="avatar" />
                                            </a>
                                            <div className="media-body">
                                                <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user" />{itemCon.name_user}</li>
                                                </ul>
                                                <p>{itemCon.comment}</p>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    )
                }
                return null;
            })
        }
    }
    return (
        <>
        {renderComment()}
        </>
    )
}
export default ListComment;