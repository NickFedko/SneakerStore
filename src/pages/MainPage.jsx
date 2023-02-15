import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import getProducts from "../services/api/products";

export default function MainPage() {
    const [products, setProducts] = useState([]); //  rename array
    
    useEffect(() => {
        getProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
        })
    }, [])

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
    </div>
    )
}