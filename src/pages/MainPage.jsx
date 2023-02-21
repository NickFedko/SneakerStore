import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import getProducts from "../services/api/products";
import { ClipLoader } from 'react-spinners';

export default function MainPage() {
    const [products, setProducts] = useState([]); //  rename array
    const [maxLimitOfProducts, setMaxLimitOfProducts] = useState(20);
    const [searchProducts, setSearchProducts] = useState('');
    const [idCategory, setIdCategory] = useState(1);
    const category = idCategory ? `/categories/${idCategory}`: '';
    const search =  (searchProducts.length >= 3) ? `/search?keywords=${searchProducts}` : '' 
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        getProducts(maxLimitOfProducts, category, search).then((response) => {
            setProducts(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
                setLoading(false)
        })
    }, [maxLimitOfProducts, idCategory, searchProducts, category, search])

    useEffect(() => {
        setMaxLimitOfProducts(20);
    },[idCategory])

   const loadMoreButton = products.length%20 ? false : true

    return(
    <div>
        <SearchBar searchProducts={searchProducts} setSearchProducts={setSearchProducts} setIdCategory={setIdCategory}/>
        <div className="list__items">
            {products.map(product => (
                <ProductItem 
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
        {products.length===0 && searchProducts.length>=3 ? <h1>Not found</h1> : null}
        {loadMoreButton ? <button className="load_more__button" onClick={() => setMaxLimitOfProducts(maxLimitOfProducts + 20)}>Load more...</button>: null}
        {loading &&
            <div className="loader__overlay">
                <ClipLoader className="loader_icon" size={200} color={'white'}/>
            </div>
        }
    </div>
    )
}