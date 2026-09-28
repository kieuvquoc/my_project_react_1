import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Api from '../Api/Api';

function AddProduct(){
    let userData=JSON.parse(localStorage.getItem("userData"));
    let navigate=useNavigate();
    const [getInputs,setInputs]=useState({
        name:"",
        price:"",
        category:"",
        brand:"",
        status:1,
        sale:0,
        company:"",
        avatar:[],
        detail:""
    });
    const [getCategory,setCategory]=useState([]);
    const [getBrand,setBrand]=useState([]);
    const [getStatus,setStatus]=useState([
        {
            id:0,
            status:"sale"
        },
        {
            id:1,
            status:"new"
        }
    ])
    const [getErrors,setErrors]=useState({});

    useEffect(()=>{
        async function LoadAddProduct(){
            try{
                if(!userData){
                    console.log("Ban chua dang nhap");
                }
                else{
                    let res = await Api.get(`/api/category-brand`);
                    if(res.data.error){
                        console.log("Da xa ra loi", res.data.error);
                    }
                    else {
                        console.log(res.data);
                        setCategory(res.data.category);
                        setBrand(res.data.brand);
                    }
                }
            }
            catch(er)
            {
                console.log("Da xay ra loi khi Get", er);
            }
        }
        LoadAddProduct();
    },[])

    function LoadCategory(){
        return(
                <>
                    <option value="">-- Chọn danh mục --</option>
                    {getCategory.map((value,index)=>{
                        return(
                        <option key={index} value={value.id}>{value.category}</option>
                        )
                    })}
                </>
            )
    }

    function LoadBrand(){
        return(
                <>
                    <option value="">-- Chọn Brand --</option>
                    {getBrand.map((value,index)=>{
                        return(
                        <option key={index} value={value.id}>{value.brand}</option>
                        )
                    })}
                </>
            )
    }

    function LoadStatus(){
        if(getStatus){
            return getStatus.map((value,index)=>{
                return(
                    <option key={index} value={value.id}>{value.status}</option>
                )
            })
        }
    }

    const kiemtraInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;

        if (name === "status" || name === "price" || name === "sale") {
        value = Number(value);
        }

        setInputs(state=>({...state,[name]:value}));
    }
    function ReaderFiles(e){
        let files=e.target.files;
        if (files.length === 0) return;

        setInputs(state => ({ ...state, avatar: Array.from(files) }));
    }
    async function kiemtraForm(e){
        e.preventDefault();
        let kiemtra=true;
        let setLois={};

        if(!getInputs.name){
            kiemtra=false;
            setLois.name="Chua nhap ten"
        }
        if(!getInputs.price){
            kiemtra=false;
            setLois.price="Chua nhap gia"
        }
        if(!getInputs.category){
            kiemtra=false;
            setLois.category="Chua chon san pham"
        }
        if(!getInputs.brand){
            kiemtra=false;
            setLois.brand="Chua chon nhan hang"
        }
        if (Number(getInputs.status) === 0) {
            if (!getInputs.sale || Number(getInputs.sale) <= 0 || Number(getInputs.sale) >= 100) {
                kiemtra = false;
                setLois.sale = "Vui lòng nhập % giảm giá hợp lệ (1 - 99%)";
            }
        }
        if(!getInputs.company){
            kiemtra=false;
            setLois.company="Chua nhap cong ty"
        }
        if(!getInputs.avatar || getInputs.avatar.length === 0){
            kiemtra=false;
            setLois.avatar="Chua chon avatar"
        } else if (getInputs.avatar.length > 3) {
            kiemtra = false;
            setLois.avatar = "Chỉ được upload tối đa 3 hình ảnh";
        } else {
            for (let file of getInputs.avatar) {
                let size = file.size;
                let name = file.name;
                let duoiFile = name.split('.').pop().toLowerCase();
                let arrDuoiFile=["jpg","png","jpeg"];

                if(size>1024*1024){
                    setLois.avatar="Kinh thuoc anh qua lon"
                    kiemtra=false;
                    break;
                }
                if(!arrDuoiFile.includes(duoiFile)){
                    setLois.avatar="Sai dinh dang";
                    kiemtra=false;
                    break;
                }
            }
        }
        if(!getInputs.detail){
            kiemtra=false;
            setLois.detail="Chua nhap mo ta"
        }
        if(!kiemtra){
            setErrors(setLois);
        }
        else {
            setErrors({});
            let data=new FormData();

            let tinhSale=Number(getInputs.price);
            if(getInputs.status==0){
                tinhSale=tinhSale*(1-getInputs.sale/100);
            }

            tinhSale = Math.round(tinhSale);

            data.append("name",getInputs.name);
            data.append("price",tinhSale);
            data.append("category",getInputs.category);
            data.append("brand",getInputs.brand);

            if(Number(getInputs.status)!==0){
                data.append("sale",0);
            }
            else data.append("sale",getInputs.sale)

            data.append("state",getInputs.status);
            data.append("company",getInputs.company);
            data.append("detail",getInputs.detail);

            getInputs.avatar.forEach(fileObj => {
                    data.append("file[]", fileObj);
            });

            
            let accessToken=userData.token;

            let config={
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                              'Content-Type': 'multipart/form-data',
                              'Accept': 'application/json'
                }
            }

            try{
                let res=await Api.post(`api/user/product/add`, data, config )
                if(res.data.errors){
                    console.log("Da xay ra loi", res.data.errors);
                }
                else {
                    alert("Add product thanh cong");
                    console.log("Add product thanh cong")
                    console.log(res.data);
                    navigate("/account/myproduct");
                }
            }
            catch(e){
                console.log("Da xay ra loi khi add product",e);
            }
        }
    }
    return(
        <div className="signup-form" style={{ width: "100%", margin: "0 auto" }}>
        <h2>Create Product</h2>
        <form onSubmit={kiemtraForm} action="/action_page.php">
            <input type="text" name="name" value={getInputs.name} onChange={kiemtraInput} placeholder="Name"/>
            <p>{getErrors.name}</p>
            <input type="number" name="price" value={getInputs.price} onChange={kiemtraInput} placeholder="Price"/>
            <p>{getErrors.price}</p>
            <select name="category" value={getInputs.category} onChange={kiemtraInput} placeholder="Please choose category">
                {LoadCategory()}
            </select>
            <p>{getErrors.category}</p>
            <select name="brand" value={getInputs.brand} onChange={kiemtraInput} placeholder="Please choose brand">
                {LoadBrand()}
            </select>
            <p>{getErrors.brand}</p>
            <select name="status" value={getInputs.status} onChange={kiemtraInput}>
                {LoadStatus()}
            </select>
            <p>{getErrors.status}</p>
            {
                Number(getInputs.status)===0 && (
                    <>
                        <input type="number" name="sale" value={getInputs.sale} onChange={kiemtraInput}/>
                        <span>%</span>
                        <p>{getErrors.sale}</p>
                    </>
                )
            }
            <input type="text" name="company" value={getInputs.company} onChange={kiemtraInput} placeholder="Company profile"/>
            <p>{getErrors.company}</p>
            <input type="file" name="avatar" multiple onChange={ReaderFiles}/>
            <p>{getErrors.avatar}</p>
            <textarea type="text" name="detail" value={getInputs.detail} onChange={kiemtraInput} placeholder="Detail"/>
            <p>{getErrors.detail}</p>
            <button type="submit" className="btn">Signup</button>
        </form>
        </div>
    )
}
export default AddProduct;