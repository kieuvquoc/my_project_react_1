import { useEffect, useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Api from '../Api/Api';
import { useCart } from '../Product/ContextCart';
import { useWishList} from '../Product/ContextWishList';


function Home() {
    let {themCart} = useCart();
    let { getItemWL, clickWishList } = useWishList();
    const [getProducts, setProducts] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() => {
        async function fetchProducts() {
        try {
            let res = await Api.get('/api/product');
            if (res.data && res.data.data) {
            setProducts(res.data.data);
            }
        } catch (error) {
            console.error("Da xay ra loi khi get", error);
        }
        }
        fetchProducts();
    }, []);

    const handleAddToCart = (e, productId) => {
        e.preventDefault();

        themCart(productId);

        alert("Da them san pham vao");
        navigate("/cart");
    };

    const handleAddtoWishList = (e, productId)=>{
        e.preventDefault();

        clickWishList(productId);
        if (getItemWL.includes(productId)) {
            alert("Đã xóa sản phẩm khỏi mục yêu thích!");
        } else {
            alert("Đã thêm sản phẩm vào mục yêu thích!");
        }
    };

    const renderProducts = () => {
        if (!getProducts || getProducts.length === 0) {
        return <p className="text-center">Dang tai product...</p>;
        }

        return getProducts.map((product, index) => {
        let firstImage = "";
        try {
            if (product.image) {
            let imageArr = typeof product.image === 'string'
                ? JSON.parse(product.image)
                : product.image;
            if (Array.isArray(imageArr) && imageArr.length > 0) {
                firstImage = imageArr[0];
            }
            }
        } catch (e) {
            console.error("Lỗi dinh dang anh:", e);
        }

        return (
            <div className="col-sm-4" key={product.id || index}>
                <div className="product-image-wrapper" key={product.id || index}>
                    <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={`http://127.0.0.1:8000/upload/product/${product.id_user}/${firstImage}`} alt={product.name}
                        style={{ height: '250px', objectFit: 'cover' }}/>
                        <h2>${product.price}</h2>
                        <p>{product.name}</p>
                        <button onClick={(e) => handleAddToCart(e, product)} className="btn btn-default add-to-cart">
                        <i className="fa fa-shopping-cart" /> Add to cart
                        </button>
                    </div>

                    <div className="product-overlay">
                        <div className="overlay-content">
                        <h2>${product.price}</h2>
                        <p>{product.name}</p>
                        <button  onClick={(e) => handleAddToCart(e, product)}
                            className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" /> Add to cart
                        </button>
                        <Link to={`/product/detail/${product.id}`} className="btn btn-default add-to-cart"
                            style={{ marginTop: '10px' }}><i className="fa fa-info-circle" /> More
                        </Link>
                        </div>
                    </div>
                    </div>

                    <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li>
                            <a href="#" onClick={(e) => handleAddtoWishList(e, product.id)}><i className="fa fa-plus-square"></i>Add to wishlist</a>
                        </li>
                        <li>
                        <a href="#!"><i className="fa fa-plus-square" /> Add to compare</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        );
        });
    };

    return (
        <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {renderProducts()}
        </div>
    );
}

export default Home;