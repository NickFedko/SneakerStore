import '../assets/styles/ShopItems.css'

import {useEffect, useState} from "react";
import getProducts from "../services/api/products";
export default function ProductItems () {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getProducts().then((response) => {
            setItems(response.data);
        }).catch(error => console.log(error))
            .finally(() => {
            console.log('Experiment completed');
        })
    }, [])

    return (
        <div className='items'>
            {items.map(item => (
                <div key={item.id} className="item__block" id={item.id}>   
                   <img className="item__block__image" src={item.picture} alt=" "/>
                    <p className="item__block__name">{item.title.split(' ').slice(0,5).join(' ')}</p>
                    <p className="item__block__price">${item.price}</p>
                    <button type="button" className={`item__block__button ${item.favourite ? 'favourite' : ''}`} />
                </div>
            ))}
        </div>
    )
}