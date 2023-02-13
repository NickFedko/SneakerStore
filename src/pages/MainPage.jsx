import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import getProducts from "../services/api/products";

export default function MainPage() {
    const [items, setItems] = useState([]); //  rename array
    
    useEffect(() => {
        getProducts().then((response) => {
            setItems(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
        })
    }, [])

    return(
    <div>
        <SearchBar />
        <div className="list__items">
            {items.map(item => (
                <ProductItem 
                    key={item.id} 
                    id={item.id} 
                    title={item.title} 
                    picture={item.picture} 
                    price={item.price}
                />
            ))}
        </div>
    </div>
    )
}