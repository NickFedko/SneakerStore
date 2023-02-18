import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import getProducts from "../services/api/products";

export default function MainPage() {
    const [products, setProducts] = useState([]); //  rename array
    const [maxLimitOfProducts, setMaxLimitOfProducts] = useState(20);
    
    useEffect(() => {
        getProducts(maxLimitOfProducts).then((response) => {
            setProducts(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
        })
    }, [maxLimitOfProducts])

    return(
    <div>
        <SearchBar />
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