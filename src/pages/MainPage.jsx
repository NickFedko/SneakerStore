import SearchBar from "../components/SearchBar";
import ProductItem from "../components/ProductItem";
import { useState, useEffect } from "react";
import {categoryProducts, getProducts, searchProducts} from "../services/api/products";
import { ClipLoader } from 'react-spinners';
import ProductItemModal from "../components/modals/ProductItemModal";
import { AnimatePresence } from "framer-motion";

export default function MainPage() {
    const [products, setProducts] = useState([]);
    const [clickedProductId, setClickedProductId] = useState(0);
    const [openProductModal, setOpenProductModal] = useState(false);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState(undefined)
    const [searchProductsValue, setSearchProductsValue] = useState('');
    const [idCategory, setIdCategory] = useState(0);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setOffset(0);
        setSortBy(undefined);
    },[idCategory, searchProductsValue])

    useEffect(() => {
        
        if (searchProductsValue && searchProductsValue.length >= 3) {
            setLoading(true);

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

        if (idCategory>=1) {
            setLoading(true);
            categoryProducts({offset, limit, sortBy}, idCategory)
                .then((response) => {
                    setProducts((prevState) => {
                        return offset ? [...prevState, ...response.data] : response.data;
                    });
                }).finally(() => {
                setLoading(false);
            });
        } 

        if (searchProductsValue === '' && +idCategory === 0) {
            setLoading(true);
            getProducts({offset, limit, sortBy})
                .then((response) => {
                    setProducts((prevState) => {
                        return offset ? [...prevState, ...response.data] : response.data;
                    });
                }).finally(() => {
                setLoading(false);
            });
        }
    }, [offset, limit, searchProductsValue, idCategory, sortBy])

   const renderLoadMoreBtn = () => {
        if(!(products.length % limit) && products.length !== 0) {
            return <button
                className="load_more__button"
                onClick={() => setOffset((prevValue) =>
                    searchProductsValue ? prevValue + limit : prevValue + 1
                )}
            >
                Load more...
            </button>
        }

        return
   }

    return (
        <div>
            <SearchBar
                searchProductsValue={searchProductsValue}
                setSearchProductsValue={setSearchProductsValue}
                setIdCategory={setIdCategory}
                setSortBy={setSortBy}
                setLimit={setLimit}
            />
            <div className="list__items">
                {products.map((product, index) => (
                    <ProductItem
                        setClickedProductId={setClickedProductId}
                        setOpenProductModal={setOpenProductModal}
                        key={index}
                        product={product}
                    />
                ))}
            </div>
            {
                (products.length === 0 && searchProductsValue.length >= 3) && 
                <>
                    <h1>No Results Found</h1>
                    <p className="error__message__no_result">We did not find any article that matches this search
                       Make sure that the search text is entered correctly
                       Try using other search criteria
                    </p>
                </>
            }
            {
                (+idCategory >= 0 && products.length === 0 && searchProductsValue.length === 0) && 
                    <h1>No items in this category yet</h1>
            }
            {renderLoadMoreBtn()}
            {
                loading &&
                <div className="loader__overlay">
                    <ClipLoader className="loader_icon" size={200} color={'white'}/>
                </div>
            }
            <AnimatePresence>
                {openProductModal && 
                    <ProductItemModal 
                        clickedProductId={clickedProductId}
                        setOpenProductModal={setOpenProductModal}
                    />
                }
            </AnimatePresence>
        </div>
    );
}