import { useState, useEffect } from 'react';

import getCategories from '../services/api/categories';

import '../assets/styles/Sorting.css'

export default function SearchBar({ searchProductsValue, setSearchProductsValue, setIdCategory, setSortBy, setLimit }) {
    const [categories, setCategories] = useState([]);
    const [onSearchVisibility, setOnSearchVisibility] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);
    useEffect(() => {
        (searchProductsValue.length > 0) 
            ? setOnSearchVisibility(true)
            : setOnSearchVisibility(false) 
    },[searchProductsValue])

    useEffect(()=> {
        getCategories().then(response => {
            setCategories([
                {name: 'All', id:0}, 
                ...response.data
            ]);
        })
    }, [])

    const sortByArray = [
        {name:undefined, title: 'Default'},
        {name:'latest', title: 'Latest'},
        {name:'popular', title: 'Popular'}
    ];

    const amountSortArray = [10, 15, 20];

    return(
        <form className="sorting__form">
            <input
                className="sorting__form__search"
                onChange={(e) => setSearchProductsValue(e.target.value)}
                type="search"
                onFocus={() => setSearchFocus(!searchFocus)}
                onBlur={() => setSearchFocus(!searchFocus)}
                placeholder={searchFocus ? 'Enter product name' : 'Search product...'}
            />
            <select
                className={`sorting__form__category ${onSearchVisibility ? 'hidden': ''}`}
                onChange={(e) => setIdCategory(e.target[e.target.selectedIndex].id)}
            >
                {
                    categories.map(item => (
                        <option key={item.id} value={item.name} id={item.id}>
                            {item.name}
                        </option>
                    ))
                }
            </select>
            <select 
                className={`sorting__form__sorter ${onSearchVisibility ? 'hidden': ''}`} 
                onChange={(e) => setSortBy(e.target.value)}
            >
                {sortByArray.map((el, index) => (
                    <option key={index} value={el.name}>
                        {el.title}
                    </option>
                ))}
            </select>
            <select
                className='sorting__form__amount'
                onChange={(e) => setLimit(e.target.value)}
            >
                {amountSortArray.map((el, index) => (
                    <option key={index}>
                        {el}
                    </option>
                ))}
            </select>
        </form>
    )
}