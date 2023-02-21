import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import {getProducts, searchProducts} from "../services/api/products";
import { ClipLoader } from 'react-spinners';

export default function MainPage() {
    const [products, setProducts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState(undefined)
    const [searchProductsValue, setSearchProductsValue] = useState('');
    const [idCategory, setIdCategory] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        if (searchProductsValue && searchProductsValue.length >= 3) {
            searchProducts({offset, limit, keywords: searchProductsValue})
                .then((response) => {
                    setProducts((prevState) => {
                        return offset ? [...prevState, ...response.data] : response.data;
                    });
                }).finally(() => {
                setLoading(false);
            });
            return
        }

        getProducts({offset, limit, sortBy})
            .then((response) => {
                setProducts((prevState) => {
                    return offset ? [...prevState, ...response.data] : response.data;
                });
            }).finally(() => {
            setLoading(false);
        });
    }, [offset, searchProductsValue])

    useEffect(() => {
        setOffset(0);
    },[idCategory, searchProductsValue])

   const renderLoadMoreBtn = () => {
        if(!(products.length % limit) && products.length !== 0) {
            return <button
                className="load_more__button"
                onClick={() => setOffset((prevValue) => prevValue + 1 )}
            >
                Load more...
            </button>
        }

        return
   }

    return (
        <div>
            <SearchBar
                searchProducts={searchProductsValue}
                setSearchProducts={setSearchProductsValue}
                setIdCategory={setIdCategory}
            />
            <div className="list__items">
                {products.map(product => (
                    <ProductItem
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
            {
               (products.length === 0 && searchProductsValue.length >= 3) && <h1>Not found</h1>
            }
            {renderLoadMoreBtn()}
            {
                loading &&
                <div className="loader__overlay">
                    <ClipLoader className="loader_icon" size={200} color={'white'}/>
                </div>
            }
        </div>
    );
}