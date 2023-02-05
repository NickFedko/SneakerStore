import axios from 'axios'
import { useState, useEffect } from 'react';

import getCategories from '../services/api/categories';

import '../assets/styles/Sorting.css'
import getCategory from '../services/api/category';

export default function SearchBar() {
    const [categories, setCategories] = useState([]);
    const [id, setId] = useState('');

    useEffect(()=> {
        getCategories().then(response => {
            console.log(response);
            setCategories(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
            console.log('Experiment completed');
         })
    }, [])

    useEffect(() => {
        getCategory(id).then(respone => {
            console.log(respone)
        }).catch(error => console.log(error))
            .finally(() => {
            console.log('Example completed')
        })
    }, [id])

    // async function getCategory(id) {
    //     let result = await axios ({
    //         method: 'GET',
    //         url: `https://demo-api.apiko.academy/api/categories/${id}`,
    //         headers: {
    //             'accept': 'application/json'
    //         }
    //     });
    //     console.log(result);
    // }


    return(
        <form className="sorting__form">
            <input className="sorting__form__search" type="search" placeholder="Search products by name"/>
            <select className="sorting__form__category" placeholder="Choose category" onChange={(e) => setId(e.target[e.target.selectedIndex].id)}>
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