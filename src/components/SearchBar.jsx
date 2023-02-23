import { useState, useEffect } from 'react';

import getCategories from '../services/api/categories';

import '../assets/styles/Sorting.css'

export default function SearchBar({ setSearchProducts, setIdCategory, setSortBy, setLimit }) {
    const [categories, setCategories] = useState([]);
    const [focus, setFocus] = useState(false);

    useEffect(()=> {
        getCategories().then(response => {
            setCategories([{name: 'All', id:0}, ...response.data]);
        })
    }, [])

    console.log(focus)

    return(
        <form className="sorting__form">
            <input
                className="sorting__form__search"
                onChange={(e) => setSearchProducts(e.target.value)}
                type="search"
                onFocus={() => setFocus(!focus)}
                onBlur={() => setFocus(!focus)}
                placeholder={focus ? 'Enter product name' : 'Search product...'}
            />
            <select
                className={`sorting__form__category ${focus ? 'hidden': 'visible'}`}
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
                className={`sorting__form__sorter ${focus ? 'hidden': 'visible'}`} 
                onChange={(e) => setSortBy(e.target.value.toLowerCase())}
            >
                <option>
                    Default
                </option>
                <option>
                    Latest
                </option>
                <option>
                    Popular
                </option>
            </select>
            <span className={focus ? 'hidden': 'visible'}>Limit of Products</span>
            <select
                className={`sorting__form__amount ${focus ? 'hidden': 'visible'}`}
                onChange={(e) => setLimit(e.target.value)}
            >
                <option>10</option>
                <option>15</option>
                <option>20</option>
            </select>
        </form>
    )
}