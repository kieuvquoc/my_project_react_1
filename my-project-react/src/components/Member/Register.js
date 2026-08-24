import React,{useState} from 'react';
import Api from '../Api/Api'

function Register(props){
    const [getInputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        avatar:null,
        lever:0,
        file:""
    });
    const [getErrors,setErrors]=useState({});

    function kiemtraInput(e){
        let name=e.target.name;
        let value=e.target.value;
        setInputs(state=>({...state,[name]:value}))
    }

    function ReaderFiles(e){
        let file=e.target.files[0]
        let reader=new FileReader();
        reader.onload=(eventReader)=>{
            setInputs(state=>({
                ...state,
                avatar:file,
                file:eventReader.target.result
            }))
        };
        reader.readAsDataURL(file);
    }

    function kiemtraEmail(email){
        let checkmail=/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
        return checkmail.test(email);
    }

    async function kiemtraForm(e){
        e.preventDefault();

        let kiemtra=true;
        let setThongBao={};
        
        if(getInputs.name==""){
            setThongBao.name="Vui long nhap name";
            kiemtra=false;
        } else setThongBao.name="";
        if(getInputs.email==""){
            setThongBao.email="Vui long nhap email";
            kiemtra=false;
        }else if(!kiemtraEmail(getInputs.email)){
            setThongBao.email="Email khong dung dinh dang";
            kiemtra=false;
        }else setThongBao.email="";
        if(getInputs.password==""){
            setThongBao.password="Vui long nhap password";
            kiemtra=false;
        }else setThongBao.password="";
        if(getInputs.phone==""){
            setThongBao.phone="Vui long nhap phone";
            kiemtra=false;
        } else if(getInputs.phone.length>10){
            setThongBao.phone="Phone phai co 10 so";
            kiemtra=false;
        } else setThongBao.phone="";
        if(getInputs.address==""){
            setThongBao.address="Vui long nhap address";
            kiemtra=false;
        } else setThongBao.address="";
        if(getInputs.avatar==null){
            setThongBao.avatar="Vui long nhap avatar";
            kiemtra=false;
        } else {
            // console.log(getInputs.avatar);
            let SizeFiles=getInputs.avatar.size;
            let NameFiles=getInputs.avatar.name;

            let LocDuoiFiles=NameFiles.split('.').pop().toLowerCase();

            let ArrDuoiFiles=["jpg","png","jpeg"];

            if(SizeFiles>1024*1024){
                setThongBao.avatar="Kinh thuoc qua lon";
                kiemtra=false;
            }
            else if(!ArrDuoiFiles.includes(LocDuoiFiles)){
                setThongBao.avatar="Sai dinh dang";
                kiemtra=false;
            }
        }

        if(!kiemtra){
           setErrors(setThongBao);
        } else {
            setErrors({});
            let data={
                name:getInputs.name,
                email:getInputs.email,
                password:getInputs.password,
                phone:getInputs.phone,
                address:getInputs.address,
                avatar:getInputs.file,
                lever:0
            }
            try{
                let response= await Api.post("/api/register",data)
                if(response.data.errors) {
                    setErrors(response.data.errors);
                } else {
                    console.log(response);
                    // /alert("Đăng ký thành công");
                    setTimeout(()=>{
                        setInputs({
                            name:"",
                            email:"",
                            password:"",
                            phone:"",
                            address:"",
                            avatar:null,
                            lever:0,
                            file:""
                        })
                    },150000)
                }
            }
            catch(error){
                console.log(error);
            }
            
            
        }
    }

    return (
    <div className="signup-form" style={{ width: "50%", margin: "0 auto" }}>
        <h2>New User Signup!</h2>
        <form onSubmit={kiemtraForm} encType="multipart/form-data">
        <input type="text" name="name" value={getInputs.name} onChange={kiemtraInput} placeholder="Name" />
        <p>{getErrors.name}</p>

        <input type="email" name="email" value={getInputs.email} onChange={kiemtraInput} placeholder="Email Address" />
        <p>{getErrors.email}</p>

        <input type="password" name="password" value={getInputs.password} onChange={kiemtraInput} placeholder="Password" />
        <p>{getErrors.password}</p>

        <input type="number" name="phone" value={getInputs.phone} onChange={kiemtraInput} placeholder="Phone" />
        <p>{getErrors.phone}</p>

        <input type="text" name="address" value={getInputs.address} onChange={kiemtraInput} placeholder="Address" />
        <p>{getErrors.address}</p>

        <input type="file" name="avatar" onChange={ReaderFiles} placeholder="Avatar" />
        <p>{getErrors.avatar}</p>

        <input type="number" name="lever" value={getInputs.lever} onChange={kiemtraInput} placeholder="Lever" />

        <button type="submit" className="btn btn-default">Signup</button>
        </form>
    </div>
);
}
export default Register;