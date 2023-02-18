import { useState, useEffect } from 'react';

import getCategories from '../services/api/categories';

import '../assets/styles/Sorting.css'
import getCategory from '../services/api/category';
import getSearchProducts from '../services/api/search_products';

export default function SearchBar({searchProducts, setSearchProducts, setIdCategory}) {
    const [categories, setCategories] = useState([]);

    useEffect(()=> {
        getCategories().then(response => {
            setCategories(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
         })
    }, [])

    return(
        <form className="sorting__form">
            <input className="sorting__form__search" onChange={(e) => setSearchProducts(e.target.value)} type="search" placeholder="Search products by name"/>
            <select className="sorting__form__category" placeholder="Choose category" onChange={(e) => setIdCategory(e.target[e.target.selectedIndex].id)}>
                {categories.map(item => (
                    <option key={item.id} value={item.name} id={item.id}> 
                        {item.name}
                    </option>
                ))}
            </select>
            <select className="sorting__form__sorter" placeholder="Sort by">
                <option>
                    Default
                </option>
                <option>
                    Newest
                </option>
                <option>
                    Most Popular
                </option>
            </select>
        </form>
    )
}