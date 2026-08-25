import React, {useState} from 'react';
import Api from '../Api/Api';
import {useNavigate} from 'react-router-dom';

function Login(){
    const[getInputs,setInputs]=useState({
      email: "",
      password: "",
      checkbox: false,
      level:0
    })

    const[getErrors,setErrors]=useState({})

    const navigate=useNavigate();

    const kiemtraInput=(e)=>{
      let name=e.target.name;
      let value=e.target.type==="checkbox"?e.target.checked:e.target.value;

      setInputs(state=>({...state,[name]:value}));
    }

    function kiemtraMail(email){
      let checkmail=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
      return checkmail.test(email);
    }

    async function XuLySubmit(e){
      e.preventDefault();
      
      let kiemtra=true;
      let thongbao={};

      if(!getInputs.email){
        thongbao.email="Vui long nhap mail";
        kiemtra=false;
      } else if (!kiemtraMail(getInputs.email)){
        thongbao.email="Khong dung dinh dang mail";
        kiemtra=false;
      }

      if(!getInputs.password){
        thongbao.password="Vui long nhap password";
        kiemtra=false;
      }

      if(!getInputs.checkbox){
        thongbao.checkbox="Hay chap nhan";
        kiemtra=false;
      }

      if(!kiemtra){
        setErrors(thongbao);
      }
      else{
        const data={
          email: getInputs.email,
          password: getInputs.password,
          level: getInputs.level
        }

        try{
          let response =await Api.post(`/api/login`,data)
          if(response.data.errors){
            setErrors(response.data.errors);
            console.log(response.data.errors.errors);
          }
          else{
            localStorage.setItem('loginUser','true');
            console.log("Login thanh cong");
            console.log(response.data);
            navigate('/blog');
            setTimeout(()=>{
              setInputs({
                email: "",
                password: "",
                checkbox: false,
                level:0
              })
            },15000)
          }
        }
        catch(error){
          console.log("Da xay ra loi",error);
        }
        
      }
    }

    return(
        <section>
            <div className="col-sm-4 col-sm-offset-1">
              <div className="login-form">
                <h2>Login to your account</h2>
                <form onSubmit={XuLySubmit}>
                  <input type="text" value={getInputs.email} onChange={kiemtraInput} name="email" placeholder="Email Address" />
                  <p>{getErrors.email}</p>
                  <input type="password" value={getInputs.password} onChange={kiemtraInput} name="password" placeholder="password" />
                  <p>{getErrors.password}</p>
                  <span>
                    <input type="checkbox" checked={getInputs.checkbox} onChange={kiemtraInput} name="checkbox" className="checkbox" /> 
                    Keep me signed in
                    <p>{getErrors.checkbox}</p>
                  </span>
                  <button type="submit" className="btn btn-default">Login</button>
                </form>
              </div>
            </div>
        </section>
    )
}
export default Login