import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import getProducts from "../services/api/products";

export default function MainPage() {
    const [products, setProducts] = useState([]); //  rename array
    const [maxLimitOfProducts, setMaxLimitOfProducts] = useState(20);
    const [searchProducts, setSearchProducts] = useState('');
    const [idCategory, setIdCategory] = useState(1);
    const category = idCategory ? `/categories/${idCategory}`: '';
    const search =  (searchProducts.length >= 3) ? `/search?keywords=${searchProducts}` : '' 
    
    useEffect(() => {
        getProducts(maxLimitOfProducts, category, search).then((response) => {
            setProducts(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
        })
    }, [maxLimitOfProducts, idCategory, searchProducts, category, search])

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
        {products.length===0 ? <h1>Not found</h1> : <button onClick={() => setMaxLimitOfProducts(maxLimitOfProducts + 20)}>Load more</button>}
    </div>
    )
}