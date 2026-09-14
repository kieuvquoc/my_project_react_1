import {useState,useEffect} from 'react';
import Api from '../Api/Api';

function Update(){
    const [getData,setData]=useState({});
    const [getInputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
        phone:"",
        address:"",
        avatar:null,
        file:""
    });

    const [getErrors,setErrors]=useState({});

    let userData = JSON.parse(localStorage.getItem("userData"));

    useEffect(()=>{
        if(!userData){
            alert("Ban chua login");
            return;
        }
        else{
            setInputs({
                name: userData?.Auth?.name || "",
                email: userData?.Auth?.email || "",
                password: "",
                phone: userData?.Auth?.phone || "",
                address: userData?.Auth?.address || "",
                avatar: userData?.Auth?.avatar || null,
                file: userData?.Auth?.file || ""
        })}
    },[])

    const kiemtraInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setInputs(state=>({...state,[name]:value}))
    }

    const ReaderFile=(e)=>{
        let file=e.target.files[0];
        if(file){
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
    }

    async function kiemtraForm(e){
        e.preventDefault();

        let kiemtra=true;
        let setThongBao={};
        
        if(!getInputs.name){
            setThongBao.name="Vui long nhap name";
            kiemtra=false;
        }

        if(!getInputs.password){
            setThongBao.password="Vui long nhap password";
            kiemtra=false;
        }

        if(!getInputs.phone){
            setThongBao.phone="Vui long nhap phone";
            kiemtra=false;
        }

        if(!getInputs.address){
            setThongBao.address="Vui long nhap address";
            kiemtra=false;
        }

        if(getInputs.avatar && getInputs.avatar instanceof File){
            let sizeFile=getInputs.avatar.size;
            let nameFile=getInputs.avatar.name;

            let locduoiFile=nameFile.split('.').pop();
            let duoiFile=['jpg','png','jpeg','gif'];

            if(sizeFile>1024*1024){
                setThongBao.avatar="File khong duoc lon hon 1MB";
                kiemtra=false;
            }
            if(!duoiFile.includes(locduoiFile)){
                setThongBao.avatar="File khong hop le";
                kiemtra=false;
            }
        }

        if(!kiemtra){
            setErrors(setThongBao);
        }
        else {
            let data=new FormData();
            data.append("email",getInputs.email);
            data.append("name",getInputs.name);
            if (getInputs.password) {
                data.append("password", getInputs.password);
            }
            data.append("phone",getInputs.phone);
            data.append("address",getInputs.address);
            if (getInputs.avatar && getInputs.avatar instanceof File) {
                data.append("avatar", getInputs.avatar); 
            }
            try{
                let accessToken=userData.token;
                let response = await Api.post(`/api/user/update/${userData.Auth.id}`,data,
                {
                    headers: { 
                              'Authorization': 'Bearer ' + accessToken,
                              'Content-Type': 'application/x-www-form-urlencoded',
                              'Accept': 'application/json'
                            }
                })
                if(response.data.error){
                    console.log(response.data.error);
                }
                else{
                    console.log("Post thanh cong", response.data.Auth);
                    let updatedUserData = {
                        ...userData,
                        Auth: response.data.Auth
                    };
                    localStorage.removeItem("userData");
                    localStorage.setItem("userData",JSON.stringify(updatedUserData));
                    alert("Update thanh cong");
                }
            }
            catch(error){
                console.log("Da xay ra loi khi post:",error);
            }
        }
    }

    return(
        <div className="signup-form" style={{ width: "50%", margin: "0 auto" }}>
        <h2>User Update</h2>
        <form onSubmit={kiemtraForm} encType="multipart/form-data">
        <input type="text" name="name" value={getInputs.name} onChange={kiemtraInput} />
        <p>{getErrors.name}</p>

        <input type="email" name="email" value={getInputs.email} readOnly />
        <p>{getErrors.email}</p>

        <input type="password" name="password" value={getInputs.password} onChange={kiemtraInput} />
        <p>{getErrors.password}</p>

        <input type="number" name="phone" value={getInputs.phone} onChange={kiemtraInput} />
        <p>{getErrors.phone}</p>

        <input type="text" name="address" value={getInputs.address} onChange={kiemtraInput} />
        <p>{getErrors.address}</p>

        <input type="file" name="avatar" onChange={ReaderFile} />
        <p>{getErrors.avatar}</p>

        <button type="submit" className="btn btn-default">Update</button>
        </form>
    </div>
    )
}
export default Update;