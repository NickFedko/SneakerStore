import axios from 'axios'
import { useState } from 'react';
import '../assets/styles/Sorting.css'

export default function SearchBar() {

    async function categories() {
        let result = await axios({
            method: 'GET',
            url: 'https://demo-api.apiko.academy/api/categories',
            headers: {
                'accept': 'application/json'
            }
        }) 
        let categories = localStorage.setItem('category', JSON.stringify(result.data))
    }

    categories();

    const items = JSON.parse(localStorage.getItem('category'));

    const categoryHandleChange = (id) => {
        getCategory(id);
        getCategoryProducts(id);
    }

    async function getCategory(id) {
        let result = await axios ({
            method: 'GET',
            url: `https://demo-api.apiko.academy/api/categories/${id}`,
            headers: {
                'accept': 'application/json'
            }
        });
        console.log(result);
    }

    async function getCategoryProducts(id) {
        let result = await axios ({
            method: 'GET',
            url: `https://demo-api.apiko.academy/api/categories/${id}/products?offset=0&limit=20&sortBy=latest`,
            headers: {
                'accept': 'application/json'
            }
        });
        console.log(result);
    }

    return(
        <form className="sorting__form">
            <input className="sorting__form__search" type="search" placeholder="Search products by name"/>
            <select className="sorting__form__category" placeholder="Choose category" onChange={(e) => categoryHandleChange(e.target[e.target.selectedIndex].id)}>
                {items.map(item => (
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