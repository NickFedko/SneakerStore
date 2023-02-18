import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import getProducts from "../services/api/products";
import getSearchProducts from "../services/api/search_products";
import getCategoryProducts from "../services/api/category_products";

export default function MainPage() {
    const [products, setProducts] = useState([]); //  rename array
    const [maxLimitOfProducts, setMaxLimitOfProducts] = useState(20);
    const [searchProducts, setSearchProducts] = useState('');
    const [idCategory, setIdCategory] = useState(1);
    
    useEffect(() => {
        getProducts(maxLimitOfProducts).then((response) => {
            setProducts(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
        })
    }, [maxLimitOfProducts])

    useEffect(() => {
        getSearchProducts(searchProducts, maxLimitOfProducts).then(response => {
            setProducts(response.data)
        }).catch(error => console.log(error))
            .finally(() => {
                console.log('example completed')
            })
    }, [searchProducts, maxLimitOfProducts])

    useEffect(() => {
        getCategoryProducts(idCategory, maxLimitOfProducts).then(response => {
            setProducts(response.data)
        }).catch(error => console.log(error))
            .finally(() => {
                console.log('example complete')
            })
    }, [idCategory, maxLimitOfProducts])

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
        <button onClick={() => setMaxLimitOfProducts(maxLimitOfProducts + 20)}>Load more</button>
    </div>
    )
}