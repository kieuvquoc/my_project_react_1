import {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import Api from '../Api/Api';

function EditProduct(){
    let userData=JSON.parse(localStorage.getItem("userData"));
    let accessToken=userData.token;
    let {id}=useParams();
    let navigate=useNavigate();

    const [getInputs,setInputs]=useState({
        name:"",
        price:"",
        category:"",
        brand:"",
        status:"",
        sale:"",
        company:"",
        avatar:[],
        detail:""
    })
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
    ]);
    const [oldImages, setOldImages] = useState([]);
    const [getFileNew, setFileNew] = useState([]);
    const [getAvtCkb,setAvtCkb]=useState([]);
    const [getErrors,setErrors]=useState({});

    useEffect(()=>{
        async function LoadInfProduct(){
            if(!userData){
                    console.log("Ban chua dang nhap");
                }
                else {
                    let config = {
                        headers:{
                            'Authorization': 'Bearer ' + accessToken,
                              'Accept': 'application/json'
                        }
                    }
                    try{
                        let res = await Api.get(`/api/category-brand`);
                        setCategory(res.data.category);
                        setBrand(res.data.brand);
                    }
                    catch(e){
                        console.log("Da xay ra loi get category-brand",e);
                    }

                    try{
                        let res = await Api.get(`/api/user/product/${id}`,config);
                        console.log(res.data.data);
                        console.log("IMAGE:", res.data.data.image);
                        setInputs({
                            name:res.data.data.name,
                            price:res.data.data.price,
                            category:res.data.data.id_category,
                            brand:res.data.data.id_brand,
                            status:res.data.data.status,
                            sale:res.data.data.sale,
                            company:res.data.data.company_profile,
                            avatar:res.data.data.image,
                            detail:res.data.data.detail
                        });
                        if(res.data.data.image){
                            setOldImages(res.data.data.image);
                        }
                    }
                    catch(e){
                        console.log("Da xa ra loi khi get Api edit",e);
                    }
                }    
        }
        LoadInfProduct();
    },[id])

    const kiemtraInput=(e)=>{
        const name=e.target.name;
        let value=e.target.value;

        if (name === "status" || name === "price" || name === "sale") {
        value = Number(value);
        }

        setInputs(state=>({...state,[name]:value}));
    }

    const xuLyFileChange = (e) => {
        if(e.target.files) {
            setFileNew(Array.from(e.target.files));
        }
    };

    function xuLyCheckbox(imgName){
        setAvtCkb(kiemtra=>{
            if(kiemtra.includes(imgName)){
                return kiemtra.filter(item=>item!==imgName);
            }
            else {
                return [...kiemtra,imgName];
            }
        });
    }

    function LoadCategory(){
        return(
            <>
                {
                    getCategory.map((value,index)=>{
                        return <option key={index} value={value.id}>{value.category}</option>
                    })
                }
            </>
        )
    }

    function LoadBrand(){
        return(
            <>
                {
                    getBrand.map((value,index)=>{
                        return <option key={index} value={value.id}>{value.brand}</option>
                    })
                }
            </>
        )
    }

    function LoadStatus(){
        if(getStatus){ 
            return getStatus.map((value,index)=>{
                            return <option key={index} value={value.id}>{value.status}</option>
                        })
            }
    }

    async function kiemtraForm(e){
        e.preventDefault();
        
        let kiemtra=true;
        let setLoi={};

        if(!getInputs.name){
            setLoi.name="Vui long nhap ten";
            kiemtra=false;
        }
        if(!getInputs.price){
            setLoi.price="Vui long nhap gia";
            kiemtra=false;
        }
        if(!getInputs.category){
            setLoi.category="Vui long chon san pham";
            kiemtra=false;
        }
        if(!getInputs.brand){
            setLoi.brand="Vui long chon brand";
            kiemtra=false;
        }
        if (Number(getInputs.status) === 0) {
            if (!getInputs.sale || Number(getInputs.sale) <= 0 || Number(getInputs.sale) >= 100) {
                kiemtra = false;
                setLoi.sale = "Vui lòng nhập % giảm giá hợp lệ (1 - 99%)";
            }
        }
        if(!getInputs.company){
            setLoi.company="Vui long nhap cong ty";
            kiemtra=false;
        }

        let soAnhConLai =  oldImages.length - getAvtCkb.length;
        let tongSoAnh = soAnhConLai + getFileNew.length;
        if (tongSoAnh === 0) {
            setLoi.avatar = "Sản phẩm phải có ít nhất 1 ảnh.";
            kiemtra = false;
        }
        else if(tongSoAnh>3){
            setLoi.avatar="Tong so hinh anh khong duoc vuot qua 3.";
            kiemtra=false;
        }
        else {
            for(let file of getFileNew){
                let size=file.size;
                let name=file.name;

                let duoiFile=name.split('.').pop().toLowerCase();

                let arrDuoiFile=["jpg","png","jpeg"];

                if(size>1024*1024){
                    setLoi.avatar="Kinh thuoc anh qua lon"
                    kiemtra=false;
                }
                if(!arrDuoiFile.includes(duoiFile)){
                    setLoi.avatar="Sai dinh dang";
                    kiemtra=false;
                }
            }
        }

        if(!kiemtra){
            setErrors(setLoi);
            return;
        }
        else {
                setErrors({});
                let tinhSale=Number(getInputs.price);
                if(getInputs.status==0){
                    tinhSale=tinhSale*(1-getInputs.sale/100);
                }
                tinhSale = Math.round(tinhSale);

                let data=new FormData();
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

                getAvtCkb.forEach(img=>{
                    data.append("avatarCheckBox[]",img);
                });

                if(getFileNew&&getFileNew.length>0){
                    getFileNew.forEach(fileObj => {
                    data.append("file[]", fileObj);
                });
                }
                else {
                    oldImages.forEach(fileObj => {
                    data.append("file[]", fileObj);
                });
                }

                let config = {
                    headers: {
                    'Authorization': 'Bearer ' + accessToken,
                              'Content-Type': 'multipart/form-data',
                              'Accept': 'application/json'
                }
                }

            try{
                let res = await Api.post(`/api/user/product/update/${id}`,data,config);
                if(res.data.errors){
                    console.log("Da xay ra loi", res.data.errors);
                }
                else{
                    console.log(res.data);
                    navigate('/account/myproduct');
                }
            }
            catch(e){
                console.log("Da xay ra loi khi post",e);
            }
        }
    }

    return(
        <div className="signup-form" style={{ width: "100%", margin: "0 auto" }}>
            <form onSubmit={kiemtraForm} encType="multipart/form-data">
            <input type="text" name="name" value={getInputs.name} onChange={kiemtraInput} />
            <p>{getErrors.name}</p>
            <input type="number" name="price" value={getInputs.price} onChange={kiemtraInput} />
            <p>{getErrors.price}</p>
            <select name="category" value={getInputs.category} onChange={kiemtraInput}>
                {LoadCategory()}
            </select>
            <p>{getErrors.category}</p>
            <select name="brand" value={getInputs.brand} onChange={kiemtraInput}>
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
            <input type="text" name="company" value={getInputs.company} onChange={kiemtraInput} />
            <p>{getErrors.company}</p>
            <input type="file" name="file" multiple onChange={xuLyFileChange} />
            <p>{getErrors.avatar}</p>
            <ul>
                {
                    oldImages && oldImages.length>0 ?
                        (oldImages.map((value,index)=>{
                            return(
                                <li key={index}>
                                    <img src={`http://127.0.0.1:8000/upload/product/${userData.Auth.id}/${value}`} className="img-fluid rounded"/>
                                    <input type="checkbox" name="avatarCheckBox[]" value={value} checked={getAvtCkb.includes(value)} onChange={()=>xuLyCheckbox(value)}/>
                                </li>
                            )
                        })) : 
                        (<p>San pham nay chua co anh</p>)
                }
            </ul>
            <p>{getErrors.avatar}</p>
            <textarea type="text" name="detail" value={getInputs.detail} onChange={kiemtraInput}/>
            <p>{getErrors.detail}</p>
            <button type="submit" className="btn">Signup</button>
        </form>
        </div>
    )
}
export default EditProduct;