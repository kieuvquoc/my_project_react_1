import {useState,useEffect} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import Api from '../Api/Api';

function DeleteProduct({setProducts}){
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function deleteProduct() {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const accessToken = userData.token;

        if (!accessToken) {
            console.log("Bạn chưa đăng nhập");
            navigate('/login');
            return;
        }

        const config = {
            headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Accept': 'application/json'
            }
        };

        try {
            let res = await Api.get(`/api/user/product/delete/${id}`, config);

            if (res.data && res.data.data) {
            console.log("Da xoa, danh sach san pham con lai:", res.data.data);

            if (typeof setProducts === 'function') {
                setProducts(res.data.data);
            }

            } else {
            console.log("Xoa that bai", res);
            }
        } catch (error) {
            console.error("Da xay ra loi khi xoa:", error);
        } finally {
            navigate('/account/myproduct');
        }
        }

        deleteProduct();
    }, [id, navigate, setProducts]);

    return (
        <div>
        <p>Đang xử lý xóa sản phẩm...</p>
        </div>
    );
    }

export default DeleteProduct;