import '../assets/styles/ShopItems.css'

import axios from 'axios'

export default function ShopItems () {

    async function products() {
        let result = await axios({
            method: 'GET',
            url: 'https://demo-api.apiko.academy/api/products?offset=0&limit=20&sortBy=latest',
            headers: {
                'accept': 'application/json'
            }
        })
        let product = localStorage.setItem('product', JSON.stringify(result.data))
    } 

    products();

    const items = JSON.parse(localStorage.getItem('product'));
    
    return (
        <div className='items'>
            {items.map(item => (
                <div key={item.id} className="item__block" id={item.id}>   
                   <img className="item__block__image" src={item.picture} />
                    <p className="item__block__name">{item.title.split(' ').slice(0,5).join(' ')}</p>
                    <p className="item__block__price">${item.price}</p>
                    <button type="button" className={`item__block__button ${item.favourite ? 'favourite' : ''}`} />
                </div>
            ))}
        </div>
    )
}